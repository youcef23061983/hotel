import UseFetch from "./UseFetch";
import { useEffect, useState } from "react";
const Terms = () => {
  const url = `${import.meta.env.VITE_PROD_URL_URL}/gallery`;

  const key = "gallery";

  const { data, isPending, error } = UseFetch(url, key);
  console.log("terms image", data && data[7].images[7]);

  useEffect(() => {
    document.title = "Terms & Conditions";
  }, []);
  if (isPending) return <h2>...is loading</h2>;
  if (error) return <h2>{error.message}</h2>;

  return (
    <div>
      <div
        className="headerimages"
        data-testid="div-Terms"
        style={{
          background: `url(${data && data[7].images[7]}) center/cover `,
        }}
      />
      <div className="privacy">
        <h2>TERMS & CONDITIONS</h2>
        <p>
          Welcome to Legend Hotel! By accessing our services, including our
          website, making reservations, or staying with us, you agree to abide
          by the following terms and conditions. Please read these terms
          carefully before engaging with Legend Hotel.
          <br />
          1.Reservations:
          <br />
          All reservations are subject to availability and confirmation.
          <br />
          Check-in time is [specified time], and check-out time is [specified
          time].
          <br />
          2.Cancellation and Modification:
          <br />
          Cancellation policies vary based on the type of reservation. Please
          review your reservation details for specific information.
          <br />
          Modification requests are subject to availability and any associated
          fees.
          <br />
          3.Guest Conduct:
          <br />
          Guests are expected to conduct themselves in a respectful and
          responsible manner, refraining from any behavior that may disturb
          other guests or compromise the safety of the property.
          <br />
          4.Payment:
          <br />
          Payment for reservations and additional services is due upon check-in
          unless otherwise specified.
          <br />
          A valid credit card must be provided at the time of reservation.
          <br />
          5.Privacy Policy:
          <br />
          Our Privacy Policy outlines how we collect, use, and disclose your
          personal information. By using our services, you consent to the
          practices described in the Privacy Policy.
          <br />
          6.Intellectual Property:
          <br />
          All content on our website, including text, images, logos, and
          trademarks, is the property of Legend Hotel and is protected by
          intellectual property laws. Any unauthorized use is strictly
          prohibited.
          <br />
          7.Liability:
          <br />
          Legend Hotel is not liable for any loss, damage, or theft of personal
          belongings during your stay.
          <br />
          Guests are responsible for any damage caused to hotel property during
          their stay.
          <br />
          8.Force Majeure:
          <br />
          Legend Hotel is not liable for any failure to perform its obligations
          due to circumstances beyond its control, including but not limited to
          natural disasters, acts of terrorism, or government regulations.
          <br />
          9.Governing Law:
          <br />
          These terms and conditions are governed by the laws of [specified
          jurisdiction]. Any disputes arising from these terms will be subject
          to the exclusive jurisdiction of the courts in [specified
          jurisdiction].
          <br />
          10.Changes to Terms and Conditions:
          <br />
          Legend Hotel reserves the right to modify these terms and conditions
          at any time. Any changes will be effective immediately upon posting on
          our website. Thank you for choosing Legend Hotel. If you have any
          questions or concerns about these terms and conditions, please contact
          us using the information provided on our website.
        </p>
      </div>
    </div>
  );
};

export default Terms;
