import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName as updateUserNameAction, selectUser } from '../features/auth/authSlice';

export default function EditNameModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [userName, setUserName] = useState(user?.userName || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await dispatch(updateUserNameAction({ userName }));
    
    if (updateUserNameAction.fulfilled.match(result)) {
      onClose();
    } else {
      setError('Une erreur est survenue lors de la mise à jour.');
    }
    
    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit user info</h2>

        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="userName">User name:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="firstName">First name:</label>
            <input
              type="text"
              id="firstName"
              value={user?.firstName || ''}
              disabled
              style={{ 
                backgroundColor: '#e9ecef', 
                cursor: 'not-allowed',
                color: '#6c757d'
              }}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="lastName">Last name:</label>
            <input
              type="text"
              id="lastName"
              value={user?.lastName || ''}
              disabled
              style={{ 
                backgroundColor: '#e9ecef', 
                cursor: 'not-allowed',
                color: '#6c757d'
              }}
            />
          </div>

          <div className="modal-buttons">
            <button 
              type="submit" 
              className="edit-button"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}