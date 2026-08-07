"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MemePlaceholder from "@/components/MemePlaceholder";
import CameraTransition from "@/components/CameraTransition";
import YesExperience from "@/app/yes/YesExperience";

export default function Story() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const [showYesExperience, setShowYesExperience] = useState(false);

  const pages = [
    {
      title: "⚠️ Statutory Warning ⚠️",
      content: (
        <>
          <p>I made something for you.</p>

          <br />

          <p>It isn't a prank.</p>
          <p>It isn't a survey.</p>

          <br />

          <p>And no...</p>
          <p>I'm not trying to sell you anything 😄</p>
          <MemePlaceholder
            title="I have something to tell you"
            src="/cat_memes-1.jpg"
          />
        </>

      ),
    },

    {
      title: "First thing, Three things, Number one",
      content: (
        <>
          <p>
            I've been banging my head trying to figure out how to get past the
            "getting to know you" phase at the gym.
          </p>

          <br />

          <p>
            The problem is... while I'm there, I'm usually busy chasing a new
            PR, overthinking random things, or getting lost in my own head (mostly unwanted data, math equations, unsolved bugs, etc). 
          </p>

          <br />

          <p>
            And, there's actually too much crowd in the gym.
          </p>

          <br />

          <p> I have no clue to approach you. So... I built this instead.</p>

          <MemePlaceholder
            title="Gym PR / Overthinking Meme"
            src='/know-u-better.png'
          />
        </>
      ),
    },

    {
      title: "Number two",
      content: (
        <>
          <p>
            You probably don't know this, but every time I think about coming
            over to talk to you, my brain runs out of tokens and decides to make it ten times harder
            than it needs to be. 
          </p>

          <br />

          <p>
            Even then, I've genuinely enjoyed every conversation we've had so
            far, no matter how short. 
          </p>

          <br />

          <p>I enjoy having working out along with you, being around your company, somewhere I find myself to have an craving to see you smile</p>

          <br />

          <MemePlaceholder
            title="Social Anxiety Meme"
            src="/memes-2.jpg"
          />
        </>
      ),
    },

    {
      title: "Number three",
      content: (
        <>
          <p>
            I'm not the kind of person who waits forever for the "perfect
            moment."
          </p>

          <br />

          <p>
            And I'm definitely not someone who can flirt my way into a date.
          </p>

          <br />

          <p>I'm more of a "vettu onnu, thundu moonu" kind of guy.</p>

          <br />

          <p>
            I'd rather ask someone out, risk getting rejected, and walk away
            with a dramatic Thalapathy-style superstar pose rather than spend months wondering what their answer would've been.
          </p>

          <p>
            
          </p>

          <MemePlaceholder
            src="/thalapathy_rajini.jpg"
            title="Thalapathy Superstar Pose Meme"
          />
        </>
      ),
    },

    {
      title: "One Last Thing...",
      content: (
        <>
          <p>By the way, that doesn't mean I'm not fun to be around.</p>

          <p>
            Or that I don't have a romantic side or am afraid of asking you out
            in person.
          </p>

          <br />

          <p>I just have a bit of a starting problem.</p>

          <p>Maybe.... that's something a coffee date could fix.</p>

          <p>So.... What do you say? ❤️</p>

          <MemePlaceholder
            src="/cat_memes.jpg"
            title="Cute Coffee Meme ☕"
          />
        </>
      ),
    },
  ];

  const nextPage = () => {
    if (step >= pages.length - 1) return;

    setShowCamera(true);

    setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 700);

    setTimeout(() => {
      setShowCamera(false);
    }, 1400);
  };



  if (showYesExperience) {
    return <YesExperience />;
  }

  return (
    <main className="min-h-dvh flex items-center justify-center px-4 pt-10 pb-8 sm:pt-12">
      <div className="w-full max-w-3xl text-center">

        {pages[step].title && (
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 px-2">
            {pages[step].title}
          </h1>
        )}

        <div className="text-lg sm:text-xl md:text-2xl leading-8 md:leading-10 text-gray-700 px-2">
          {pages[step].content}
        </div>

        {step < pages.length - 1 ? (
          <button
            onClick={nextPage}
            className="mt-10 md:mt-14 w-full sm:w-auto px-8 py-4 rounded-full bg-black text-white hover:scale-105 transition"
          >
            Continue →
          </button>
        ) : (
          <div className="font-body text-lg sm:text-xl md:text-2xl leading-8 md:leading-10 text-gray-700 px-2">

            <button
              onClick={() => setShowYesExperience(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-green-600 text-white hover:scale-105 transition"
            >
              ❤️ Yes
            </button>

            <button
              onClick={() => router.push("/no")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-red-500 text-white hover:scale-105 transition"
            >
              🙈 No
            </button>

          </div>
        )}

      </div>

      {/* Camera Animation */}
      <CameraTransition show={showCamera} />

    </main>
  );
}
