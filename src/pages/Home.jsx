import Feature from "../components/Feature";

export default function Home() {
  return (
    <>
      <main className="main">
        <section className="hero">
          <div className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">
              Open a savings account with Argent Bank today!
            </p>
          </div>
        </section>
        <section className="features">
          <Feature
            image="/img/icon-chat.png"
            title="You are our #1 priority"
            text="Need to talk to a representative? You can reach us 24/7 by chat or phone."
          />
          <Feature
            image="/img/icon-money.png"
            title="More savings means higher rates"
            text="The more you save, the higher your interest rate will be!"
          />
          <Feature
            image="/img/icon-security.png"
            title="Security you can trust"
            text="We use top-of-the-line encryption to keep your data safe."
          />
        </section>
      </main>
    </>
  );
}
