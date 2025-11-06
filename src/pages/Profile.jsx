import AccountCard from "../components/AccountCard";

export default function Profile() {
  // TODO: plus tard, remplacer par les données Redux/API (ex: firstName/lastName)
  const firstName = "Tony";
  const lastName = "Jarvis";

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {firstName} {lastName}!
        </h1>

        <button className="edit-button">Edit Name</button>
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
    </main>
  );
}
