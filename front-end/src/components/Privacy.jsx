import UseFetch from "./UseFetch";
import { useEffect } from "react";

const Privacy = () => {
  const url = `${import.meta.env.VITE_PROD_URL_URL}/gallery`;

  const key = "gallery";

  const { data, isPending, error } = UseFetch(url, key);
  useEffect(() => {
    document.title = "Privacy Policy";
  }, []);
  if (isPending) return <h2>...is loading</h2>;
  if (error) return <h2>{error.message}</h2>;

  return (
    <div>
      <div
        data-testid="privecy-background"
        className="headerimages"
        style={{
          background: `url(${data && data[7].images[6]}) center/cover `,
        }}
      />
      <div className="privacy">
        <h2>PRIVACY POLICY</h2>
        <p data-testid="privecy-paragraph">
          At Legend Hotel, we prioritize the privacy and security of our guests,
          recognizing the importance of safeguarding personal information in the
          modern digital age. This Privacy Policy outlines our commitment to
          transparently managing, collecting, and using your data. As you
          entrust us with your information, we want you to be informed about how
          it will be handled. This policy covers the types of information we
          collect, the purposes for which it is used, and the measures we take
          to ensure its confidentiality. By choosing to stay with Legend Hotel,
          you acknowledge and agree to the terms of this Privacy Policy. We
          continuously strive to uphold the highest standards of data
          protection, ensuring that your experience with us is not only
          luxurious but also secure. Thank you for placing your trust in Legend
          Hotel.
        </p>
      </div>
      <div className="privacy">
        <h2>PERSONAL INFORMATION WE COLLECT</h2>
        <p>
          1_Personal Information We Collect:
          <br />
          Contact Information:
          <br /> Name , Address , Email , address , Phone number
          <br />
          2_Reservation Details:
          <br />
          Check-in and check-out dates
          <br /> Room preferences
          <br /> Special requests
          <br />
          3_Payment Information:
          <br />
          Credit card details
          <br />
          Billing address
          <br />
          4_Demographic Information:
          <br />
          Age
          <br />
          Gender
          <br />
          Nationality
          <br />
          5_Guest Preferences:
          <br />
          Room preferences
          <br /> Special requests
          <br />
          Dietary restrictions (if provided)
          <br />
          6_Feedback and Reviews:
          <br />
          Feedback and reviews submitted through surveys or online platforms
          <br />
          7_Membership Information:
          <br />
          Loyalty program details (if applicable)
          <br />
          Membership preferences
          <br />
          8_Technical Information:
          <br />
          IP address
          <br />
          Device information (e.g., browser type, operating system)
          <br />
          Social Media Data (if applicable):
          <br />
          Information publicly available on social media profiles when using
          social media login options
          <br />
          9_CCTV Footage (if applicable):
          <br />
          Recorded footage for security purposes within hotel premises
          <br />
          <br /> It's crucial to ensure that guests are aware of the information
          collected and the purpose behind it. Legend Hotel should outline in
          the Privacy Policy how this data is used, stored, and protected.
          Always comply with relevant data protection laws and regulations, and
          consider consulting with legal professionals to ensure your privacy
          policy aligns with local and international standards.
        </p>
      </div>
      <div className="privacy">
        <h2>HOW WE USE YOUR INFORMATION</h2>
        <p>
          At Legend Hotel, we use the information we collect for various
          purposes to enhance your guest experience and ensure the seamless
          operation of our services. The primary uses of your information
          include: 1. Reservation and Guest Services:
          <br />
          To process and confirm your reservations.
          <br />
          To provide personalized guest services based on your preferences and
          special requests.
          <br />
          2.Communication:
          <br />
          To communicate with you regarding your reservation, stay, or any
          special requests.
          <br />
          To send you relevant information, updates, and promotional offers
          about our hotel services.
          <br />
          3.Payment Processing:
          <br />
          To process payments for your reservations and other services.
          <br />
          To prevent and detect fraudulent activities. 4.Guest Experience
          Enhancement:
          <br />
          To tailor our services to meet your individual preferences.
          <br />
          To gather feedback through surveys or reviews to enhance our services.
          <br />
          5. Membership Programs:
          <br />
          To administer loyalty or membership programs (if applicable).
          <br />
          To provide benefits and rewards associated with membership.
          <br />
          6.Marketing and Promotions:
          <br />
          To personalize marketing efforts based on your preferences and
          interests.
          <br />
          To inform you about promotions, events, and offers that may be of
          interest to you. 7.Legal and Security:
          <br />
          To comply with legal obligations and regulatory requirements.
          <br />
          To ensure the security and safety of our guests and premises.
          <br />
          8.Analytics and Improvements:
          <br />
          To analyze and improve our services, website, and overall guest
          experience. To conduct statistical and demographic research. 9.Social
          Media Engagement:
          <br />
          To engage with guests on social media platforms (if applicable).
          <br />
          To facilitate social media features, such as sharing content. 10.CCTV
          Surveillance:
          <br />
          To monitor and ensure the safety and security of our premises. By
          choosing to stay with Legend Hotel, you consent to the use of your
          information as outlined in this Privacy Policy. We take measures to
          protect your data and ensure that it is used responsibly and in
          accordance with applicable data protection laws.
        </p>
      </div>
      <div className="privacy">
        <h2>Disclosing Your Information:</h2>
        <p>
          1.Service Providers:
          <br />
          We may share your information with trusted third-party service
          providers who assist us in delivering our services, including
          reservation systems, payment processors, and IT support. These service
          providers are obligated to maintain the confidentiality and security
          of your information.
          <br />
          2.Legal Compliance:
          <br />
          We may disclose your information to comply with applicable laws,
          regulations, or legal processes. This includes responding to lawful
          requests from governmental authorities.
          <br />
          3. Business Transactions:
          <br />
          In the event of a merger, acquisition, or sale of assets, your
          information may be transferred as part of the business transaction. We
          will ensure that the receiving entity upholds the same level of
          protection for your data.
          <br />
          4. Safety and Security:
          <br />
          Your safety and security are paramount. We may disclose your
          information, including CCTV footage, when necessary to protect the
          safety and security of our guests, staff, and property.
          <br />
          5.Marketing and Promotions:
          <br />
          With your consent, we may share your information with third parties
          for marketing and promotional purposes. You can opt-out of such
          communications at any time.
          <br />
          6.Guest Consent:
          <br />
          At times, we may disclose your information as explicitly consented by
          you. For instance, when you participate in promotional events, your
          name may be disclosed if you win a prize.
          <br />
          7.Anonymized Data:
          <br />
          We may share aggregated and anonymized data for statistical analysis
          and research purposes. This data does not personally identify you.
          <br />
          Legend Hotel does not sell or rent your personal information to third
          parties for their marketing purposes. We take measures to ensure that
          any disclosure of your information is done in accordance with this
          Privacy Policy and applicable data protection laws.
        </p>
      </div>
      <div className="privacy">
        <h2>Overseas Data Transfers:</h2>
        <p>
          As a global hospitality provider, Legend Hotel may transfer your
          personal information to locations outside the country or region in
          which you reside. By choosing to stay with us, you acknowledge and
          agree to the transfer of your data to overseas destinations for the
          purposes outlined in this Privacy Policy. We take measures to ensure
          that your information is adequately protected and that such transfers
          comply with applicable data protection laws.
          <br />
          1.International Operations:
          <br />
          Legend Hotel operates on an international scale, and as such, your
          personal information may be processed in countries where we have
          operations or where our service providers are located.
          <br />
          2.Data Protection Standards:
          <br />
          When transferring personal information overseas, we adhere to data
          protection standards and implement contractual safeguards, such as
          standard contractual clauses, to ensure the same level of protection
          as required by applicable data protection laws.
          <br />
          3.Service Providers and Partners:
          <br />
          Some of our service providers or business partners may be located in
          countries with different data protection laws. In such cases, we take
          steps to ensure that these entities adhere to appropriate data
          protection standards.
          <br />
          4.Consent for Transfers:
          <br />
          Your consent to this Privacy Policy includes your acknowledgment and
          acceptance of potential overseas data transfers. If you have concerns
          about such transfers, please contact us to discuss your specific
          situation. Legend Hotel is committed to maintaining the
          confidentiality, integrity, and security of your personal information,
          regardless of where it is processed. We continuously review and update
          our data protection practices to align with evolving legal
          requirements and industry standards. If you have any questions or
          concerns regarding overseas data transfers, please contact our Data
          Protection Officer using the contact information provided in this
          Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
