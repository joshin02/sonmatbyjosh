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
                  Welcome to sonmat by josh! I created this site to 
                  highlight all the different foods I cook and eat. I'm a
                  self-taught cook learning from watching youtube, ig
                  reels, and watching my mom cook. I'm going
                  to be as transparent as I can on this site, showing the
                  highlights but also the many fails that happen as I continue to cook and make content! Thanks for
                  checking out the site and if you ever decide to try making any
                  of the recipes here, 
                  tag me{" "}
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