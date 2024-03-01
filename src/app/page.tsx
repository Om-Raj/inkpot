"use client"
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <main className="main">
      <div className="center">
        <div className="hero">
          <div className="hero-text">
            <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString('Inkpot.')
                  .pauseFor(1500)
                  .deleteChars(5)
                  .pauseFor(250)
                  .typeString("spire.")
                  .pauseFor(1500)
                  .deleteChars(6)
                  .pauseFor(250)
                  .typeString("novate.")
                  .pauseFor(1500)
                  .deleteChars(9)
                  .pauseFor(250)
                  .start();
              }}
              options={{
                autoStart: true,
                loop: true,
              }}  
            />
            
          </div>
          <div className="hero-subtext">Give voice to your unspoken thoughts.</div>
        </div>
      </div>
    </main>
  );
}
