import Banner from "../pages/Banner";
import { useEffect } from "react";
import UseFetch from "./UseFetch";

const Cookies = () => {
  const url = "http://localhost:3000/gallery";

  const { data, isPending, error } = UseFetch(url);
  useEffect(() => {
    document.title = "Cookies";
  }, []);
  if (isPending) return <h2>...is loading</h2>;
  if (error) return <h2>{error.message}</h2>;

  return (
    <div>
      <div
        className="headerimages"
        style={{
          background: `url(${data && data[7].images[8]}) center/cover `,
        }}
      >
        <Banner title="COOKIES POLICY" />
      </div>
      <div className="privacy">
        <h2>COOKIES POLICY</h2>
        <p>
          Welcome to Legend Hotel. This Cookies Policy explains how we use
          cookies and similar technologies on our website. By using our website,
          you consent to the use of cookies as described in this policy.
          <br />
          1.What are Cookies?
          <br />
          Cookies are small text files that are placed on your device when you
          visit a website. They are commonly used to ensure the proper
          functioning of websites, enhance user experience, and provide
          analytical information.
          <br />
          2.Types of Cookies We Use:
          <br />
          Essential Cookies:** These cookies are necessary for the basic
          functionality of our website and enable you to navigate and use its
          features.
          <br />
          Analytical/Performance Cookies:** These cookies help us analyze how
          visitors interact with our website, allowing us to improve its
          functionality and user experience.
          <br />
          Functionality Cookies:** These cookies enhance your experience by
          remembering choices you make (such as language preferences) and
          provide personalized features.
          <br />
          Advertising/Targeting Cookies:** These cookies are used to deliver
          content more relevant to you and your interests. They may be used to
          deliver targeted advertising.
          <br />
          3.How We Use Cookies:
          <br />
          We use cookies for various purposes, including but not limited to
          improving website functionality, analyzing site traffic, and
          personalizing content.
          <br />
          4.Managing Cookies:
          <br />
          Most web browsers allow you to control and manage cookies through
          their settings. You can configure your browser to accept, reject, or
          notify you when a cookie is set.
          <br />
          Please note that blocking certain cookies may affect the functionality
          of our website.
          <br />
          5.Third-Party Cookies:
          <br />
          Some cookies on our website are placed by third-party service
          providers to assist us in analyzing site performance and delivering
          personalized content. These third parties have their own privacy
          policies.
          <br />
          6.Changes to Cookies Policy:
          <br />
          We may update our Cookies Policy from time to time. Any changes will
          be posted on this page.
          <br />
          7.Contact Us:
          <br />
          If you have any questions or concerns about our Cookies Policy, please
          contact us using the information provided on our website. By
          continuing to use our website, you acknowledge that you have read and
          understood this Cookies Policy. For more detailed information about
          the cookies we use and how they are used, please refer to our Privacy
          Policy.
        </p>
      </div>
    </div>
  );
};

export default Cookies;
