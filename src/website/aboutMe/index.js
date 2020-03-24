import React from "react";
import Pages from "../../components/pages/Pages";
import "./aboutMe.scss";
// import "./about.scss"
export default function AboutMe(props) {
  return (
    <Pages>
      <section className="aboutMe">
        <div className="top">
          <div className="top__me"></div>
          <h1 className="top__title">Phillip Kellogg</h1>
        </div>
        <article className="text">
          <p>
            I am an aspiring Fullstack developer and video game enthusiast. I
            first got into programming while I was getting my bachelor's degree
            in university, I spent my free time making games in Unity, using C#
            and unities libraries. This was a fantastic learning experience for
            me and opened my horizon to the joys of programming. Personally its
            a field I love as each problem is presented like an intricate puzzle
            that although at times can be frustrating, is immensely gratifying
            to solve!
          </p>
          <p>
            My passion for programming extends far beyond games however, as I
            have studied and received a Diploma from BrainStations Web
            Development program along with worked on many other Javascript based
            websites both on my own and as a member of various development
            teams.
          </p>
        </article>
      </section>
    </Pages>
  );
}
