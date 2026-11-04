/* ==========================================================================
   蔚蓝共生计划 - 浏览器 NFC 标签识别
   使用 Web NFC 读取标签中的 URL、文本或产品标识，并自动打开产品档案。
   ========================================================================== */

(function () {
  'use strict';

  class NfcScanner {
    constructor() {
      this.reader = null;
      this.isScanning = false;
      this.button = document.getElementById('btnNfcScan');
      this.status = document.getElementById('nfcStatusText');
      this.currentProductId = this.getCurrentProductId();
      this.bindEvents();
      this.updateAvailability();
    }

    bindEvents() {
      if (this.button) {
        this.button.addEventListener('click', () => this.start());
      }
    }

    updateAvailability() {
      if (!this.button) return;
      if (!('NDEFReader' in window)) {
        this.button.title = '当前浏览器不支持 Web NFC，请使用 Android Chrome';
        this.button.setAttribute('aria-label', '当前浏览器不支持网页 NFC');
      }
    }

    getCurrentProductId() {
      const params = new URLSearchParams(window.location.search);
      return params.get('id') || params.get('p') || params.get('prod');
    }

    setStatus(message, state) {
      if (this.status) {
        this.status.textContent = message;
        this.status.dataset.state = state || '';
      }
    }

    async start() {
      if (!('NDEFReader' in window)) {
        this.setStatus('当前浏览器不支持网页 NFC，请使用 Android Chrome', 'error');
        return;
      }

      if (this.isScanning) return;

      try {
        this.reader = new window.NDEFReader();
        this.reader.addEventListener('reading', event => this.handleReading(event));
        this.reader.addEventListener('readingerror', () => {
          this.setStatus('标签读取失败，请将手机靠近 NFC 标签后重试', 'error');
        });
        await this.reader.scan();
        this.isScanning = true;
        this.button.classList.add('is-scanning');
        this.button.textContent = '📡 NFC 扫描中';
        this.setStatus('NFC 扫描已开启，请靠近产品标签', 'scanning');
      } catch (error) {
        this.setStatus(this.getErrorMessage(error), 'error');
      }
    }

    getErrorMessage(error) {
      if (error && error.name === 'NotAllowedError') {
        return 'NFC 权限未开启，请允许网页访问 NFC 后重试';
      }
      if (error && error.name === 'NotSupportedError') {
        return '当前设备不支持网页 NFC，请使用 Android Chrome';
      }
      return '无法开启 NFC 扫描，请确认页面使用 HTTPS 或 localhost';
    }

    handleReading(event) {
      const payload = this.getRecordPayload(event.message);
      const product = this.findProduct(payload);

      if (!product) {
        this.setStatus('已读取 NFC 标签，但未找到对应的蔚蓝共生产品', 'error');
        return;
      }

      this.setStatus(`已识别「${product.shortName}」，正在自动打开档案`, 'success');
      const targetUrl = window.getProductNfcUrl
        ? window.getProductNfcUrl(product.id)
        : `product.html?id=${encodeURIComponent(product.id)}`;

      if (this.currentProductId === product.id) {
        return;
      }

      window.location.assign(targetUrl);
    }

    getRecordPayload(message) {
      if (!message || !message.records) return [];

      return Array.from(message.records).map(record => {
        try {
          if (record.recordType === 'text') {
            return this.decodeTextRecord(record);
          }
          if (record.recordType === 'url' || record.recordType === 'absolute-url') {
            return this.decodeRecord(record);
          }
          return this.decodeRecord(record);
        } catch (error) {
          return '';
        }
      }).filter(Boolean);
    }

    decodeTextRecord(record) {
      const data = new Uint8Array(record.data.buffer, record.data.byteOffset, record.data.byteLength);
      if (!data.length) return '';
      const languageLength = data[0] & 0x3f;
      return new TextDecoder().decode(data.slice(languageLength + 1));
    }

    decodeRecord(record) {
      const data = new Uint8Array(record.data.buffer, record.data.byteOffset, record.data.byteLength);
      if (record.recordType !== 'url' || !data.length) {
        return new TextDecoder().decode(data);
      }

      const uriPrefixes = [
        '',
        'http://www.',
        'https://www.',
        'http://',
        'https://',
        'tel:',
        'mailto:',
        'ftp://anonymous:anonymous@',
        'ftp://ftp.',
        'ftps://',
        'sftp://',
        'smb://',
        'nfs://',
        'ftp://',
        'dav://',
        'news:',
        'telnet://',
        'imap:',
        'rtsp://',
        'urn:',
        'pop:',
        'sip:',
        'sips:',
        'tftp:',
        'btspp://',
        'btl2cap://',
        'btgoep://',
        'tcpobex://',
        'irdaobex://',
        'file://',
        'urn:epc:id:',
        'urn:epc:tag:',
        'urn:epc:pat:',
        'urn:epc:raw:',
        'urn:epc:',
        'urn:nfc:'
      ];
      const prefix = uriPrefixes[data[0]] || '';
      return prefix + new TextDecoder().decode(data.slice(1));
    }

    findProduct(payloads) {
      if (!window.PRODUCTS_DATA) return null;
      const searchableText = payloads.join('\n').toLowerCase();
      return window.PRODUCTS_DATA.find(product => [
        product.id,
        product.slug,
        product.nfcChipId,
        product.tokenHash
      ].some(value => value && searchableText.includes(String(value).toLowerCase()))) || null;
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    window.nfcScanner = new NfcScanner();
  });
})();
