import Link from "next/link";
import { MachineCard } from "@/components/MachineCard";
import { machineCatalogue } from "@/content";

export default function HomePage() {
  const totalQuestions = machineCatalogue.reduce(
    (sum, machine) => sum + machine.questions.length,
    0,
  );
  const totalParts = machineCatalogue.reduce(
    (sum, machine) => sum + machine.components.length,
    0,
  );

  return (
    <div className="page">
      <section className="hero">
        <div className="hero__inner">
          <p className="hero__eyebrow">Interactive 3D learning · Shikshit &amp; Kaushal Bharat</p>
          <h1>
            Look inside the machines you are learning about.
          </h1>
          <p className="hero__lead">
            Rotate a cutaway, peel it apart, select a component and follow a guided explanation of
            how the machine works. Then check what you understood.
          </p>
          <div className="hero__actions">
            <Link href={`/machines/${machineCatalogue[0].id}`} className="button button--light">
              Start with the induction motor
            </Link>
            <Link href="#machines" className="button button--outline-light">
              Browse all machines
            </Link>
          </div>
          <dl className="hero-stats">
            <div>
              <dt>Machines</dt>
              <dd>{machineCatalogue.length}</dd>
            </div>
            <div>
              <dt>Selectable parts</dt>
              <dd>{totalParts}</dd>
            </div>
            <div>
              <dt>Quiz questions</dt>
              <dd>{totalQuestions}</dd>
            </div>
            <div>
              <dt>Login required</dt>
              <dd>No</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section" id="machines">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Catalogue</p>
            <h2>Choose a machine</h2>
          </div>
          <p className="section-note">
            Three electrical machines, one shared learning workflow. Models are schematic teaching
            cutaways built from geometry, not manufacturer CAD files.
          </p>
        </div>

        <div className="catalogue-grid">
          {machineCatalogue.map((machine, index) => (
            <MachineCard key={machine.id} machine={machine} index={index} />
          ))}
        </div>
      </section>

      <section className="section" id="how">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Workflow</p>
            <h2>How a lesson works</h2>
          </div>
        </div>
        <div className="how-grid">
          <article className="how-card">
            <span className="step-number">01</span>
            <h3>Inspect</h3>
            <p>
              Orbit the cutaway, zoom in and select individual parts. The component list is always
              available as a keyboard-friendly alternative to clicking in 3D.
            </p>
          </article>
          <article className="how-card">
            <span className="step-number">02</span>
            <h3>Separate</h3>
            <p>
              Switch to exploded view to see how the assembly fits together. Parts return to their
              exact original positions when you reassemble the model.
            </p>
          </article>
          <article className="how-card">
            <span className="step-number">03</span>
            <h3>Understand</h3>
            <p>
              Follow a six-step explanation with conceptual field and waveform diagrams, then
              answer a short quiz with explanations for every question.
            </p>
          </article>
        </div>
      </section>

      <section className="section honesty">
        <div className="honesty__inner">
          <div>
            <p className="eyebrow">Scope and honesty</p>
            <h2>What this prototype is — and is not</h2>
          </div>
          <ul className="honesty-list">
            <li>
              <strong>These are schematic models.</strong> Geometry is procedural and simplified
              for teaching. No CAD, GLB or third-party 3D asset is bundled.
            </li>
            <li>
              <strong>Animations are conceptual.</strong> Rotating-field and flux visuals show
              relationships, not calculated field solutions.
            </li>
            <li>
              <strong>Content is draft.</strong> Component explanations and quiz keys still need
              review by a qualified faculty member.
            </li>
            <li>
              <strong>Not a simulator.</strong> No torque, loss, temperature or efficiency numbers
              are claimed. Formulas are labelled ideal relations.
            </li>
            <li>
              <strong>Complements laboratory work.</strong> It does not replace hands-on training or
              electrical safety procedures.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
