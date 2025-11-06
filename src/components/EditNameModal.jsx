import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileApi } from '../services/userApi';
import { updateUserName, selectFirstName, selectLastName, selectUserName } from '../features/auth/authSlice';

export default function EditNameModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const currentUserName = useSelector(selectUserName);

  const [userName, setUserName] = useState(currentUserName || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await updateProfileApi({ userName });
      dispatch(updateUserName(userName));
      onClose();
    } catch (err) {
      setError('Une erreur est survenue lors de la mise à jour.');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
              value={firstName || ''}
              disabled
              style={{ 
                backgroundColor: '#e9ecef', 
                cursor: 'not-allowed',
                color: '#6c757d'
              }}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="LastName">First name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName || ''}
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