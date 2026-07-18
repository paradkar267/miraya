import React from 'react';
import './ConfirmModal.css';

/**
 * Usage: <ConfirmModal config={config} onClose={() => setConfig(null)} />
 * config = { message, subMessage, confirmText, danger, onConfirm }
 * Pass config=null to hide.
 */
const ConfirmModal = ({ config, onClose }) => {
  if (!config) return null;

  const { message, subMessage, confirmText = 'Confirm', danger = false, onConfirm } = config;

  const handleConfirm = () => {
    onClose();
    onConfirm();
  };

  return (
    <div className="cm-backdrop" onClick={onClose}>
      <div className="cm-box" onClick={e => e.stopPropagation()}>
        <div className={`cm-icon ${danger ? 'danger' : 'warn'}`}>
          {danger ? '⚠' : '◈'}
        </div>
        <h3 className="cm-title">{message}</h3>
        {subMessage && <p className="cm-sub">{subMessage}</p>}
        <div className="cm-actions">
          <button className="cm-btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className={`cm-btn-confirm ${danger ? 'danger' : ''}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
