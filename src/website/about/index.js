import React from "react";
import Pages from "../../components/pages/Pages";
import "./about.scss";
export default function About(props) {
  return (
    <Pages>
      <section id="top " className="about">
        <header className="heading">
          <h1 className="heading__title">How its made!</h1>
        </header>
        <div className="content">
          <article className="technologies">
            <h3>How was Dungeon Crawl was made?</h3>
            <p>
              This project was put together through a combination of Javascript
              React and Redux. Making even an old school turn based 2D RPG can
              come with some difficulties. For this reason I chose to use a
              state management system <em>Redux </em>
              for this project. With loads of dialogue and animations this was a
              necessity. Furthermore react is not well optimized for video games{" "}
              <strong>imagine my shock</strong> which resulted in limited
              capacity for animations and timed state updates. However I made
              the most of what I had and frankly am quite proud of the finished
              project for a week and a half's work and my first voyage into the
              world of redux!
            </p>
          </article>
          <div className="technologies__image--wrapper">
            <div className="technologies__image"></div>
          </div>
          <article className="technologies">
            <h3>How are the maps are generated?</h3>
            <p>
              To generate maps I used a method I found from{" "}
              <a href="https://github.com/ASteinheiser/react-rpg.com">
                Andrew Steinheiser
              </a>{" "}
              of creating a matrix of arrays each holding a different value. I
              then created a algorithm that would search for my specific tile
              and match said tile to a sprite of my choosing. A digit above a
              certain value would act as an impassable tile while everything
              below that digit the player would be able to pass through.
            </p>
          </article>
        </div>
        <article className="matrix">
          <div className="matrix__matrix">
            <p className="matrix__text">
              {" "}
              [ 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42,
              41, 42, 41, 42 ],
            </p>
            <p className="matrix__text">
              [ 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41,
              42, 41, 42, 41 ],
            </p>
            <p className="matrix__text">
              [ 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42,
              41, 42, 41, 42 ],
            </p>
            <p className="matrix__text">
              {" "}
              [ 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41,
              42, 41, 42, 41 ],
            </p>
            <p className="matrix__text">
              [ 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42,
              41, 42, 41, 42 ],
            </p>
            <p className="matrix__text">
              {" "}
              [ 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41,
              42, 41, 42, 41 ],
            </p>
            <p className="matrix__text">
              {" "}
              [ 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42,
              41, 42, 41, 42 ],
            </p>
            <p className="matrix__text">
              {" "}
              [ 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41,
              42, 41, 42, 41 ],
            </p>
            <p className="matrix__text">
              {" "}
              [ 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42,
              41, 42, 41, 42 ],
            </p>
            <p className="matrix__text">
              {" "}
              [ 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41, 42, 41,
              42, 41, 42, 41 ]
            </p>
          </div>
          <div className="matrix__desc"></div>
        </article>
        <div className="content">
          <article className="technologies">
            <h3>How do the fights work?</h3>
            <p>
              Each component has an individual check to see if the component has
              the capacity for combat. Upon getting to the end of that
              components dialogue a fight is initiated. Basically there are two
              function being past back and forth on the player attack. As soon
              as either the player or enemies health drops bellow 0 the fight is
              over.
            </p>
          </article>
          <div className="fights">
            <div className="fights__main"></div>
          </div>
          <article className="technologies">
            <h3>Credits</h3>
            <p>
              Logic was largely made by myself{" "}
              <a href="https://www.linkedin.com/in/phillip-kellogg/">
                Phillip Kellogg
              </a>{" "}
              taking inspiration from{" "}
              <a href="https://github.com/ASteinheiser/react-rpg.com">
                Andrew Steinheiser{" "}
              </a>{" "}
              and the beautiful art was drawn by{" "}
              <a href="https://0x72.itch.io/16x16-dungeon-tileset">
                0x72 or Robert on itch.io
              </a>
            </p>
          </article>
        </div>
      </section>
    </Pages>
  );
}
