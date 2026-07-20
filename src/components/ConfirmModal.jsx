import React from 'react';
import './ConfirmModal.css';

/**
 * Usage: <ConfirmModal config={config} onClose={() => setConfig(null)} />
 * config = { message, subMessage, confirmText, danger, isAlert, isSuccess, onConfirm }
 * Pass config=null to hide.
 */
const ConfirmModal = ({ config, onClose }) => {
  if (!config) return null;

  const { message, subMessage, confirmText = 'Confirm', danger = false, isAlert = false, isSuccess = false, onConfirm } = config;

  const handleConfirm = () => {
    onClose();
    if (onConfirm) onConfirm();
  };

  const getIcon = () => {
    if (isSuccess) return '✓';
    if (danger) return '⚠';
    return '◈';
  };

  const getIconClass = () => {
    if (isSuccess) return 'success';
    if (danger) return 'danger';
    return 'warn';
  };

  return (
    <div className="cm-backdrop" onClick={onClose}>
      <div className="cm-box" onClick={e => e.stopPropagation()}>
        <div className={`cm-icon ${getIconClass()}`}>
          {getIcon()}
        </div>
        <h3 className="cm-title">{message}</h3>
        {subMessage && <p className="cm-sub">{subMessage}</p>}
        <div className="cm-actions">
          {!isAlert && <button className="cm-btn-cancel" onClick={onClose}>Cancel</button>}
          <button
            className={`cm-btn-confirm ${danger ? 'danger' : ''} ${isSuccess ? 'success' : ''}`}
            onClick={handleConfirm}
          >
            {isAlert && confirmText === 'Confirm' ? 'OK' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
