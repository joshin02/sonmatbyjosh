import Header from "@/components/header";

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="about-page">
        <section className="about-section">
          <div className="about-all-content">
              <p className="about-greeting">
              안녕! I'm Josh
            </p>

            <div className="about-grid">
              <div className="about-image">
                <img
                  src="/img/josh.JPG"
                  alt="Josh"
                />
              </div>

              <div className="about-text card">
                <h2>
                  dish developer, professional big back, and food show fanatic
                </h2>

                <p className="font-about">
                  Welcome to sonmat by josh! I created this site to document and
                  highlight all the different foods I cook and eat. I'm a
                  self-taught cook learning from watching youtube, tiktoks, ig
                  reels, and watching my 엄마 (mom) cook from afar LOL. I'm going
                  to be as transparent as I can on this site, showing the
                  highlights but also lowlights in my culinary journey! Thanks for
                  checking out the site and if you ever decide to try making any
                  of the recipes here, I would be super appreciative if you
                  tagged me{" "}
                    <a
                      href="https://www.instagram.com/sonmatbyjosh/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="about-ig-link"
                    >
                      @sonmatbyjosh
                    </a>{" "}
                  on ig!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}