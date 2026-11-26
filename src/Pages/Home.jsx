import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import Footer from "../components/Footer/Footer";
import "../index.css";

const sections = [
  {
    title: "Departments & Medical Equipment",
    description:
      "View hospital departments and the medical equipment assigned to each department.",
    icon: "🏥",
    to: "/departments",
  },
  {
    title: "Preventive Maintenance",
    description:
      "Organize scheduled preventive maintenance for medical equipment.",
    icon: "🛠️",
    to: "/pm",
  },
  {
    title: "Corrective Maintenance",
    description:
      "Record equipment faults and corrective maintenance activities.",
    icon: "🔧",
    to: "/cm",
  },
  {
    title: "Equipment Transfer",
    description:
      "Manage equipment transfers between hospital departments.",
    icon: "🔄",
    to: "/equipment-transfer",
  },
  {
    title: "Statistics",
    description:
      "Review statistics based on recorded system data.",
    icon: "📊",
    to: "/statistics",
  },
  {
    title: "Inventory",
    description:
      "Manage biomedical supplies and inventory stock.",
    icon: "📦",
    to: "/inventory",
  },
];

function Home() {
  return (
    <div className="app">
      <Header />

      <main className="dashboard">
        <div className="dashboard-heading">
          <h1>Welcome to Akalil Hospital</h1>
        </div>

        <section className="dashboard-grid">
          {sections.map((section) => (
            <Card
              key={section.title}
              title={section.title}
              description={section.description}
              icon={section.icon}
              to={section.to}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;