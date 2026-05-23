import React, { useState, useRef, useCallback } from 'react';
import glizzyLogo from '../assets/glizzy-logo.svg';

function InvoicePage({ onLogout }) {
  // --- Editable Invoice Fields ---
  const [issuedTo, setIssuedTo] = useState('Richard Sanchez');
  const [clientCompany, setClientCompany] = useState('Thynk Unlimited');
  const [clientAddress, setClientAddress] = useState('123 Anywhere St., Any City');
  const [invoiceNo, setInvoiceNo] = useState('00001');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);

  const [specialNotice, setSpecialNotice] = useState('Payment is due within 2 months of invoice date.');

  // Signature section (your info is fixed, client side editable)
  const [sigClientName, setSigClientName] = useState('');
  const [sigClientCompany, setSigClientCompany] = useState('');

  // --- Line Items ---
  const [items, setItems] = useState([
    { id: 1, description: 'Brand consultation', unitPrice: 100, qty: 1 },
    { id: 2, description: 'Logo design', unitPrice: 100, qty: 1 },
    { id: 3, description: 'Website design', unitPrice: 100, qty: 1 },
  ]);

  const invoiceRef = useRef(null);
  let nextId = useRef(items.length + 1);

  // --- Handlers ---
  const addItem = () => {
    nextId.current += 1;
    setItems([...items, { id: nextId.current, description: '', unitPrice: 0, qty: 1 }]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  // --- Calculations ---
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  const total = subtotal;

  // --- Format helpers ---
  const formatCurrency = (amount) => {
    return 'Rs. ' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  };

  // --- PDF Export (uses browser Print → Save as PDF) ---
  const exportToPDF = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="app-root">
      {/* ===== HEADER ===== */}
      <header className="app-header">
        <div className="header-left">
          <img src={glizzyLogo} alt="Glizzy" className="header-logo-img" />
        </div>
        <nav className="header-nav">
          <a href="#" className="nav-link active">Create Invoice</a>
        </nav>
        <div className="header-right">
          <button className="btn-export-header" onClick={exportToPDF}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
          <button className="btn-logout" onClick={onLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16,17 21,12 16,7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="app-main">
        {/* ----- LEFT PANEL: EDITOR ----- */}
        <aside className="editor-panel">
          <div className="editor-scroll">
            {/* Invoice Details Section */}
            <section className="editor-section">
              <h2 className="section-title">Invoice Details</h2>
              <div className="field-grid-2">
                <div className="field-group">
                  <label className="field-label">Invoice No</label>
                  <input
                    type="text"
                    className="field-input"
                    value={invoiceNo}
                    onChange={(e) => setInvoiceNo(e.target.value)}
                    placeholder="00001"
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Date</label>
                  <input
                    type="date"
                    className="field-input"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </div>

              </div>
            </section>

            {/* Client Details Section */}
            <section className="editor-section">
              <h2 className="section-title">Client Details</h2>
              <div className="field-group">
                <label className="field-label">Issued To (Client Name)</label>
                <input
                  type="text"
                  className="field-input"
                  value={issuedTo}
                  onChange={(e) => setIssuedTo(e.target.value)}
                  placeholder="e.g. John Smith"
                />
              </div>
              <div className="field-group">
                <label className="field-label">Company</label>
                <input
                  type="text"
                  className="field-input"
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  placeholder="e.g. Acme Corp"
                />
              </div>
              <div className="field-group">
                <label className="field-label">Address</label>
                <textarea
                  className="field-input field-textarea"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  placeholder="Street address, City, Country"
                  rows={2}
                />
              </div>
            </section>

            {/* Line Items Section */}
            <section className="editor-section">
              <div className="section-header-row">
                <h2 className="section-title">Line Items</h2>
                <button className="btn-add-item" onClick={addItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add Item
                </button>
              </div>

              <div className="items-table-editor">
                <div className="items-header-row">
                  <span className="col-desc">Description</span>
                  <span className="col-price">Unit Price</span>
                  <span className="col-qty">Qty</span>
                  <span className="col-total">Total</span>
                  <span className="col-action"></span>
                </div>
                {items.map((item) => (
                  <div className="item-row" key={item.id}>
                    <input
                      className="item-input col-desc"
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Item description"
                    />
                    <input
                      className="item-input col-price"
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                    />
                    <input
                      className="item-input col-qty"
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                      min="0"
                    />
                    <span className="item-total col-total">{formatCurrency(item.unitPrice * item.qty)}</span>
                    <button
                      className="btn-remove-item col-action"
                      onClick={() => removeItem(item.id)}
                      title="Remove item"
                      disabled={items.length <= 1}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Totals in editor */}
              <div className="editor-totals">
                <div className="totals-row">
                  <span>Subtotal</span>
                  <span className="totals-value">{formatCurrency(subtotal)}</span>
                </div>
                <div className="totals-row totals-grand">
                  <span>Total</span>
                  <span className="totals-value">{formatCurrency(total)}</span>
                </div>
              </div>
            </section>

            {/* Signature Section */}
            <section className="editor-section">
              <h2 className="section-title">Signature Details</h2>
              <div className="field-group">
                <label className="field-label">Client's Name (for signature)</label>
                <input
                  type="text"
                  className="field-input"
                  value={sigClientName}
                  onChange={(e) => setSigClientName(e.target.value)}
                  placeholder="Client's name"
                />
              </div>
              <div className="field-group">
                <label className="field-label">Client's Company (for signature)</label>
                <input
                  type="text"
                  className="field-input"
                  value={sigClientCompany}
                  onChange={(e) => setSigClientCompany(e.target.value)}
                  placeholder="Client's company"
                />
              </div>
              <div className="fixed-sig-info">
                <div className="fixed-sig-label">Your Signature (Fixed)</div>
                <div className="fixed-sig-name">Prasad Brandigampala — Director</div>
              </div>
            </section>

            {/* Special Notice */}
            <section className="editor-section">
              <h2 className="section-title">Special Notice</h2>
              <div className="field-group">
                <textarea
                  className="field-input field-textarea"
                  value={specialNotice}
                  onChange={(e) => setSpecialNotice(e.target.value)}
                  placeholder="e.g. Payment is due within 2 weeks..."
                  rows={3}
                />
              </div>
            </section>
          </div>
        </aside>

        {/* ----- RIGHT PANEL: LIVE INVOICE PREVIEW ----- */}
        <section className="preview-panel">
          <div className="preview-container">
            <button className="btn-export-pdf" onClick={exportToPDF}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
              Export to PDF
            </button>

            {/* ===== THE INVOICE ===== */}
            <div className="invoice-page" ref={invoiceRef}>
              {/* Invoice Header */}
              <div className="invoice-header">
                <div className="invoice-logo-area">
                  <img src={glizzyLogo} alt="Glizzy" className="invoice-logo-img" />
                </div>
                <div className="invoice-title-area">
                  <div className="invoice-title-line"></div>
                  <h1 className="invoice-title">INVOICE</h1>
                </div>
              </div>

              {/* Issued To + Invoice Meta */}
              <div className="invoice-meta-section">
                <div className="invoice-issued-to">
                  <span className="meta-label">ISSUED TO:</span>
                  <span className="meta-client-name">{issuedTo || '—'}</span>
                  <span className="meta-client-company">{clientCompany}</span>
                  <span className="meta-client-address">{clientAddress}</span>
                </div>
                <div className="invoice-meta-right">
                  <div className="meta-row">
                    <span className="meta-label">INVOICE NO:</span>
                    <span className="meta-value">{invoiceNo}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">DATE:</span>
                    <span className="meta-value">{formatDate(invoiceDate)}</span>
                  </div>

                </div>
              </div>

              {/* Items Table */}
              <div className="invoice-table">
                <div className="invoice-table-header">
                  <span className="t-col-desc">DESCRIPTION</span>
                  <span className="t-col-price">UNIT PRICE</span>
                  <span className="t-col-qty">QTY</span>
                  <span className="t-col-total">TOTAL</span>
                </div>
                {items.map((item) => (
                  <div className="invoice-table-row" key={item.id}>
                    <span className="t-col-desc">{item.description || '—'}</span>
                    <span className="t-col-price">{item.unitPrice}</span>
                    <span className="t-col-qty">{item.qty}</span>
                    <span className="t-col-total">{formatCurrency(item.unitPrice * item.qty)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="invoice-totals">
                <div className="invoice-totals-row">
                  <span className="totals-label">SUBTOTAL</span>
                  <span className="totals-amount">{formatCurrency(subtotal)}</span>
                </div>
                <div className="invoice-totals-row invoice-totals-grand">
                  <span className="totals-label">TOTAL</span>
                  <span className="totals-amount">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Signatures */}
              <div className="invoice-signatures">
                <div className="sig-block sig-client">
                  <div className="sig-line"></div>
                  <span className="sig-name">{sigClientName || 'CLIENTS NAME'}</span>
                  <span className="sig-role">{sigClientCompany || 'Company name'}</span>
                </div>
                <div className="sig-block sig-owner">

                  <div className="sig-line"></div>
                  <span className="sig-name">PRASAD BRANDIGAMPALA</span>
                  <span className="sig-role">Director</span>
                </div>
              </div>

              {/* Special Notice */}
              {specialNotice && (
                <div className="invoice-notice">
                  <p>{specialNotice}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="app-footer">
        <span className="footer-logo">GLIZZY</span>
        <span className="footer-copy">© 2024 Glizzy Invoice Systems. All rights reserved.</span>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Help Center</a>
        </div>
      </footer>
    </div>
  );
}

export default InvoicePage;
