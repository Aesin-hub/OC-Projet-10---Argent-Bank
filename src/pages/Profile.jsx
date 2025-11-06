import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFirstName, selectLastName, selectUserName } from '../features/auth/authSlice';
import AccountCard from "../components/AccountCard";
import EditNameModal from "../components/EditNameModal";

export default function Profile() {
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const userName = useSelector(selectUserName);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userName || `${firstName} ${lastName}`}!
        </h1>

        <button className="edit-button"
        onClick={() => setIsModalOpen(true)}>Edit Name</button>
      </div>

      <h2 className="sr-only">Accounts</h2>
      <div className="accounts-container">
        <AccountCard
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
          onClick={() => {}}
        />
        <AccountCard
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
          onClick={() => {}}
        />
        <AccountCard
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
          onClick={() => {}}
        />
      </div>

      <EditNameModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
