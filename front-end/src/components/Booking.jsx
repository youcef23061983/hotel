import { useEffect, useState } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import img1 from "/src/assets/images/gallery/booking.jpg";
import { useMutation } from "@tanstack/react-query";
import Banner from "../pages/Banner";
import { useParams, Link } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format, differenceInDays, addDays } from "date-fns";
import { FcCheckmark } from "react-icons/fc";
import { motion } from "framer-motion";
import { useQuery, QueryClient } from "@tanstack/react-query";

const Booking = () => {
  const { id } = useParams();
  const [info, setInfo] = useState(false);
  const [congra, setCongra] = useState(false);
  const [calendar, setCalendar] = useState(true);
  const url = `${import.meta.env.VITE_PROD_URL_URL}/rooms`;

  const queryClient = new QueryClient();

  const productFun = async () => {
    const res = await fetch(`${url}/${id}`);
    if (!res.ok) {
      throw Error("There is no product data");
    }
    return res.json();
  };
  const {
    data: roomData,
    error,
    isPending,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: productFun,
    initialData: () => {
      return queryClient
        .getQueryData(["products"])
        ?.find((x) => x.id === parseInt(id));
    },
  });
  useEffect(() => {
    document.title = "Booking";
  }, []);
  const storedUnavailables = localStorage.getItem(`room_${id}_unavailables`);
  const initialDates = storedUnavailables ? JSON.parse(storedUnavailables) : [];
  const [dates, setDates] = useState(initialDates);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const dateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate.getTime());
    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };
  const allDates = dateRange(date[0].startDate, date[0].endDate);

  const arrival = format(date[0].startDate, "MM/dd/yyy");

  const departure = format(addDays(date[0].endDate, 1), "MM/dd/yyy");

  const estimatedTotal = roomData ? roomData.price * allDates.length : 0;

  const [user, setUser] = useState({
    arrival: "",
    departure: "",
    dates: "",
    price: "",
    total: "",
    title: "",
    firstName: "",
    lastName: "",
    countryCode: "",
    phoneNumber: "",
    email: "",
    country: "",
    city: "",
    nationality: "",
    creditCardNumber: "",
    expirationMonth: "",
    year: "",
    securityCode: "",
    nameHolder: "",
    termsCondition: false,
    emailMe: false,
  });

  const patchData = async () => {
    const updatedUnavailables = roomData
      ? [...roomData.unavailables, ...allDates]
      : [];
    localStorage.setItem(
      `room_${id}_unavailables`,
      JSON.stringify(updatedUnavailables)
    );
    setDates(updatedUnavailables);

    const updateRes = await fetch(`http://localhost:3000/rooms/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ unavailables: updatedUnavailables }),
    });
  };

  const { data: add, mutate: unavailableData } = useMutation({
    mutationFn: patchData,
  });
  const updatedBooking = roomData ? [...roomData.booking, user] : [];

  const bookingFun = async () => {
    const res = await fetch(`http://localhost:3000/rooms/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ booking: updatedBooking }),
    });

    setInfo(!info);
    setCongra(!congra);
  };

  const { data: addBooking, mutate: bookingMutate } = useMutation({
    mutationFn: bookingFun,
  });

  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleDateChange = (item) => {
    const arrival = format(item.selection.startDate, "MM/dd/yyyy");
    const departure = format(addDays(item.selection.endDate, 1), "MM/dd/yyy");
    const allDates = dateRange(
      item.selection.startDate,
      item.selection.endDate
    );

    const numberOfNights =
      differenceInDays(item.selection.endDate, item.selection.startDate) + 1;
    const price = roomData ? roomData.price : 0;

    const total = roomData ? roomData.price * numberOfNights : 0;

    setUser((prevUser) => ({
      ...prevUser,
      arrival: arrival,
      departure: departure,
      dates: allDates,
      price,
      total,
    }));

    setDate([item.selection]);
  };

  const confirm = (e) => {
    e.preventDefault();
    if (
      !user.firstName ||
      !user.lastName ||
      !user.title ||
      !user.phoneNumber ||
      !user.countryCode ||
      !user.country ||
      !user.nationality ||
      !user.creditCardNumber ||
      !user.expirationMonth ||
      !user.year ||
      !user.securityCode ||
      !user.nameHolder ||
      !user.termsCondition ||
      !user.emailMe ||
      !user.email
    ) {
      alert("please enter your information");
      return;
    }
    if (!user.arrival || !user.departure) {
      alert("please go back and choose your booking days ");
      return;
    }
    if (
      user.firstName &&
      user.lastName &&
      user.title &&
      user.phoneNumber &&
      user.countryCode &&
      user.country &&
      user.nationality &&
      user.creditCardNumber &&
      user.expirationMonth &&
      user.year &&
      user.securityCode &&
      user.nameHolder &&
      user.termsCondition &&
      user.emailMe &&
      user.email &&
      user.departure &&
      user.arrival
    ) {
      unavailableData();
      bookingMutate();
      return;
    }
  };
  const clearLocalStorage = () => {
    localStorage.removeItem(`room_${id}_unavailables`);
  };

  // clearLocalStorage();

  const cleanupLocalStorage = () => {
    localStorage.removeItem(`room_${id}_user`);
  };
  // cleanupLocalStorage();

  const removeAll = () => {
    localStorage.clear();
  };
  // removeAll();

  const img2 = roomData ? roomData.images[0] : null;

  const calendarVariants = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.5,
        type: "spring",
        when: "beforeChildren",
        staggerChildren: 0.5,
      },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut", type: "spring", duration: 2 },
    },
  };
  const calendarchildVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const informationVariants = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.5,
        type: "spring",
        when: "beforeChildren",
        staggerChildren: 0.5,
      },
    },
  };
  const bookingchildVariants = {
    hidden: { opacity: 0, x: "100vw" },
    visible: { opacity: 1, x: 0 },
    exit: {
      x: "100vw",
      transition: { ease: "easeInOut", type: "spring", duration: 2 },
    },
  };
  const detailschildVariants = {
    hidden: { opacity: 0, x: "-100vw" },
    visible: { opacity: 1, x: 0 },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut", type: "spring", duration: 2 },
    },
  };
  if (isPending) return <h2>...is loading</h2>;
  if (error) return <h2>{error.message}</h2>;
  return (
    <div>
      <div className="headerimages" data-testid="booking-div">
        <img src={img1} alt="" className="detailImg" />

        <Banner title="BOOKING" />
      </div>
      {calendar && (
        <motion.div
          className="calendarContainer"
          variants={calendarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.h2 variants={calendarchildVariants}>
            SELECT YOUR DATES
          </motion.h2>
          <motion.div className="calendar" variants={calendarchildVariants}>
            <IoCalendarNumberOutline />

            <Link>
              {arrival} to {departure}{" "}
            </Link>
          </motion.div>
          <DateRange
            className="calendar"
            editableDateInputs={true}
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            ranges={date}
            minDate={date[0].startDate}
            disabledDates={dates}
          />
          <motion.button
            className="link-btn"
            variants={calendarchildVariants}
            onClick={() => {
              setInfo(!info);
              setCalendar(!calendar);
            }}
          >
            submit
          </motion.button>
        </motion.div>
      )}
      {info && (
        <motion.div
          className="information"
          variants={informationVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h2>GUEST INFORMATION</h2>
          <div className="infoContainer">
            <motion.div className="roomBooking" variants={bookingchildVariants}>
              <div className="imgBooking">
                <img src={`/${img2}`} alt="" className="img" />
              </div>
              <div className="roomInfo">
                <h2>{roomData && roomData.name}</h2>
                <div className="calendarDate">
                  <label htmlFor="arrival">Arrival:</label>
                  <input
                    type="text"
                    name="arrival"
                    id="arrival"
                    value={user.arrival}
                    onChange={handleDateChange}
                  />{" "}
                </div>
                <div className="calendarDate">
                  <label htmlFor="departure">Departure:</label>
                  <input
                    type="text"
                    name="departure"
                    id="departure"
                    value={user.departure}
                    onChange={handleDateChange}
                  />
                </div>
                <div className="calendarDate">
                  <p>Guest:</p>
                  <p>{roomData && roomData.capacity.number}</p>
                </div>
                <div className="calendarDate">
                  <p>Max Children:</p>
                  <p>{roomData && roomData.max_children}</p>
                </div>
                <div className="calendarDate">
                  <p>Stay per night:</p>
                  <p>{roomData && roomData.price} $</p>
                </div>

                <div className="calendarDate">
                  <p>Estimated Total (FEES AND TAXES INCLU):</p>
                  <p>{estimatedTotal} $</p>
                </div>
              </div>
            </motion.div>

            <motion.form
              onSubmit={confirm}
              className="allDetails"
              variants={detailschildVariants}
            >
              <div className="guestInfo">
                <h2>GUEST DETAIL</h2>
                <div className="guestDiv">
                  <div className="guestTitle">
                    <label htmlFor="title">Title*</label>
                    <select
                      name="title"
                      value={user.title}
                      onChange={handleChange}
                    >
                      <option value="">title</option>

                      <option value="Mrs">Mrs.</option>
                      <option value="Miss">Miss.</option>
                      <option value="Mx">Mx.</option>
                      <option value="Dr">Dr.</option>
                      <option value="Prof">Prof.</option>
                    </select>
                  </div>
                  <div className="guestTitle">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      value={user.firstName}
                    />
                  </div>
                </div>
                <div className="guestTitle">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    value={user.lastName}
                  />
                </div>
                <div className="guestDiv">
                  <div className="guestTitle">
                    <label htmlFor="countryCode">
                      Phone Number(country code)*
                    </label>
                    <select
                      class="form-select"
                      id="phone"
                      name="countryCode"
                      onChange={handleChange}
                      value={user.countryCode}
                    >
                      <option value="">phone</option>
                      <option value="93">Afghanistan +93</option>
                      <option value="358">Aland Islands +358</option>
                      <option value="355">Albania +355</option>
                      <option value="213">Algeria +213</option>
                      <option value="1684">American Samoa +1684</option>
                      <option value="376">Andorra +376</option>
                      <option value="244">Angola +244</option>
                      <option value="1264">Anguilla +1264</option>
                      <option value="672">Antarctica +672</option>
                      <option value="1268">Antigua and Barbuda +1268</option>
                      <option value="54">Argentina +54</option>
                      <option value="374">Armenia +374</option>
                      <option value="297">Aruba +297</option>
                      <option value="61">Australia +61</option>
                      <option value="43">Austria +43</option>
                      <option value="994">Azerbaijan +994</option>
                      <option value="1242">Bahamas +1242</option>
                      <option value="973">Bahrain +973</option>
                      <option value="880">Bangladesh +880</option>
                      <option value="1246">Barbados +1246</option>
                      <option value="375">Belarus +375</option>
                      <option value="32">Belgium +32</option>
                      <option value="501">Belize +501</option>
                      <option value="229">Benin +229</option>
                      <option value="1441">Bermuda +1441</option>
                      <option value="975">Bhutan +975</option>
                      <option value="591">Bolivia +591</option>
                      <option value="599">
                        Bonaire, Sint Eustatius and Saba +599
                      </option>
                      <option value="387">Bosnia and Herzegovina +387</option>
                      <option value="267">Botswana +267</option>
                      <option value="55">Bouvet Island +55</option>
                      <option value="55">Brazil +55</option>
                      <option value="246">
                        British Indian Ocean Territory +246
                      </option>
                      <option value="673">Brunei Darussalam +673</option>
                      <option value="359">Bulgaria +359</option>
                      <option value="226">Burkina Faso +226</option>
                      <option value="257">Burundi +257</option>
                      <option value="855">Cambodia +855</option>
                      <option value="237">Cameroon +237</option>
                      <option value="1">Canada +1</option>
                      <option value="238">Cape Verde +238</option>
                      <option value="1345">Cayman Islands +1345</option>
                      <option value="236">Central African Republic +236</option>
                      <option value="235">Chad +235</option>
                      <option value="56">Chile +56</option>
                      <option value="86">China +86</option>
                      <option value="61">Christmas Island +61</option>
                      <option value="672">Cocos (Keeling) Islands +672</option>
                      <option value="57">Colombia +57</option>
                      <option value="269">Comoros +269</option>
                      <option value="242">Congo +242</option>
                      <option value="242">
                        Congo, Democratic Republic of the Congo +242
                      </option>
                      <option value="682">Cook Islands +682</option>
                      <option value="506">Costa Rica +506</option>
                      <option value="225">Cote D'Ivoire +225</option>
                      <option value="385">Croatia +385</option>
                      <option value="53">Cuba +53</option>
                      <option value="599">Curacao +599</option>
                      <option value="357">Cyprus +357</option>
                      <option value="420">Czech Republic +420</option>
                      <option value="45">Denmark +45</option>
                      <option value="253">Djibouti +253</option>
                      <option value="1767">Dominica +1767</option>
                      <option value="1809">Dominican Republic +1809</option>
                      <option value="593">Ecuador +593</option>
                      <option value="20">Egypt +20</option>
                      <option value="503">El Salvador +503</option>
                      <option value="240">Equatorial Guinea +240</option>
                      <option value="291">Eritrea +291</option>
                      <option value="372">Estonia +372</option>
                      <option value="251">Ethiopia +251</option>
                      <option value="500">
                        Falkland Islands (Malvinas) +500
                      </option>
                      <option value="298">Faroe Islands +298</option>
                      <option value="679">Fiji +679</option>
                      <option value="358">Finland +358</option>
                      <option value="33">France +33</option>
                      <option value="594">French Guiana +594</option>
                      <option value="689">French Polynesia +689</option>
                      <option value="262">
                        French Southern Territories +262
                      </option>
                      <option value="241">Gabon +241</option>
                      <option value="220">Gambia +220</option>
                      <option value="995">Georgia +995</option>
                      <option value="49">Germany +49</option>
                      <option value="233">Ghana +233</option>
                      <option value="350">Gibraltar +350</option>
                      <option value="30">Greece +30</option>
                      <option value="299">Greenland +299</option>
                      <option value="1473">Grenada +1473</option>
                      <option value="590">Guadeloupe +590</option>
                      <option value="1671">Guam +1671</option>
                      <option value="502">Guatemala +502</option>
                      <option value="44">Guernsey +44</option>
                      <option value="224">Guinea +224</option>
                      <option value="245">Guinea-Bissau +245</option>
                      <option value="592">Guyana +592</option>
                      <option value="509">Haiti +509</option>
                      <option value="39">
                        Holy See (Vatican City State) +39
                      </option>
                      <option value="504">Honduras +504</option>
                      <option value="852">Hong Kong +852</option>
                      <option value="36">Hungary +36</option>
                      <option value="354">Iceland +354</option>
                      <option value="91">India +91</option>
                      <option value="62">Indonesia +62</option>
                      <option value="98">Iran, Islamic Republic of +98</option>
                      <option value="964">Iraq +964</option>
                      <option value="353">Ireland +353</option>
                      <option value="44">Isle of Man +44</option>
                      <option value="972">Israel +972</option>
                      <option value="39">Italy +39</option>
                      <option value="1876">Jamaica +1876</option>
                      <option value="81">Japan +81</option>
                      <option value="44">Jersey +44</option>
                      <option value="962">Jordan +962</option>
                      <option value="7">Kazakhstan +7</option>
                      <option value="254">Kenya +254</option>
                      <option value="686">Kiribati +686</option>
                      <option value="850">
                        Korea, Democratic People's Republic of +850
                      </option>
                      <option value="82">Korea, Republic of +82</option>
                      <option value="381">Kosovo +383</option>
                      <option value="965">Kuwait +965</option>
                      <option value="996">Kyrgyzstan +996</option>
                      <option value="856">
                        Lao People's Democratic Republic +856
                      </option>
                      <option value="371">Latvia +371</option>
                      <option value="961">Lebanon +961</option>
                      <option value="266">Lesotho +266</option>
                      <option value="231">Liberia +231</option>
                      <option value="218">Libyan Arab Jamahiriya +218</option>
                      <option value="423">Liechtenstein +423</option>
                      <option value="370">Lithuania +370</option>
                      <option value="352">Luxembourg +352</option>
                      <option value="853">Macao +853</option>
                      <option value="389">
                        Macedonia, the Former Yugoslav Republic of +389
                      </option>
                      <option value="261">Madagascar +261</option>
                      <option value="265">Malawi +265</option>
                      <option value="60">Malaysia +60</option>
                      <option value="960">Maldives +960</option>
                      <option value="223">Mali +223</option>
                      <option value="356">Malta +356</option>
                      <option value="692">Marshall Islands +692</option>
                      <option value="596">Martinique +596</option>
                      <option value="222">Mauritania +222</option>
                      <option value="230">Mauritius +230</option>
                      <option value="262">Mayotte +262</option>
                      <option value="52">Mexico +52</option>
                      <option value="691">
                        Micronesia, Federated States of +691
                      </option>
                      <option value="373">Moldova, Republic of +373</option>
                      <option value="377">Monaco +377</option>
                      <option value="976">Mongolia +976</option>
                      <option value="382">Montenegro +382</option>
                      <option value="1664">Montserrat +1664</option>
                      <option value="212">Morocco +212</option>
                      <option value="258">Mozambique +258</option>
                      <option value="95">Myanmar +95</option>
                      <option value="264">Namibia +264</option>
                      <option value="674">Nauru +674</option>
                      <option value="977">Nepal +977</option>
                      <option value="31">Netherlands +31</option>
                      <option value="599">Netherlands Antilles +599</option>
                      <option value="687">New Caledonia +687</option>
                      <option value="64">New Zealand +64</option>
                      <option value="505">Nicaragua +505</option>
                      <option value="227">Niger +227</option>
                      <option value="234">Nigeria +234</option>
                      <option value="683">Niue +683</option>
                      <option value="672">Norfolk Island +672</option>
                      <option value="1670">
                        Northern Mariana Islands +1670
                      </option>
                      <option value="47">Norway +47</option>
                      <option value="968">Oman +968</option>
                      <option value="92">Pakistan +92</option>
                      <option value="680">Palau +680</option>
                      <option value="970">
                        Palestinian Territory, Occupied +970
                      </option>
                      <option value="507">Panama +507</option>
                      <option value="675">Papua New Guinea +675</option>
                      <option value="595">Paraguay +595</option>
                      <option value="51">Peru +51</option>
                      <option value="63">Philippines +63</option>
                      <option value="64">Pitcairn +64</option>
                      <option value="48">Poland +48</option>
                      <option value="351">Portugal +351</option>
                      <option value="1787">Puerto Rico +1787</option>
                      <option value="974">Qatar +974</option>
                      <option value="262">Reunion +262</option>
                      <option value="40">Romania +40</option>
                      <option value="7">Russian Federation +7</option>
                      <option value="250">Rwanda +250</option>
                      <option value="590">Saint Barthelemy +590</option>
                      <option value="290">Saint Helena +290</option>
                      <option value="1869">Saint Kitts and Nevis +1869</option>
                      <option value="1758">Saint Lucia +1758</option>
                      <option value="590">Saint Martin +590</option>
                      <option value="508">
                        Saint Pierre and Miquelon +508
                      </option>
                      <option value="1784">
                        Saint Vincent and the Grenadines +1784
                      </option>
                      <option value="684">Samoa +684</option>
                      <option value="378">San Marino +378</option>
                      <option value="239">Sao Tome and Principe +239</option>
                      <option value="966">Saudi Arabia +966</option>
                      <option value="221">Senegal +221</option>
                      <option value="381">Serbia +381</option>
                      <option value="381">Serbia and Montenegro +381</option>
                      <option value="248">Seychelles +248</option>
                      <option value="232">Sierra Leone +232</option>
                      <option value="65">Singapore +65</option>
                      <option value="721">Sint Maarten +721</option>
                      <option value="421">Slovakia +421</option>
                      <option value="386">Slovenia +386</option>
                      <option value="677">Solomon Islands +677</option>
                      <option value="252">Somalia +252</option>
                      <option value="27">South Africa +27</option>
                      <option value="500">
                        South Georgia and the South Sandwich Islands +500
                      </option>
                      <option value="211">South Sudan +211</option>
                      <option value="34">Spain +34</option>
                      <option value="94">Sri Lanka +94</option>
                      <option value="249">Sudan +249</option>
                      <option value="597">Suriname +597</option>
                      <option value="47">Svalbard and Jan Mayen +47</option>
                      <option value="268">Swaziland +268</option>
                      <option value="46">Sweden +46</option>
                      <option value="41">Switzerland +41</option>
                      <option value="963">Syrian Arab Republic +963</option>
                      <option value="886">
                        Taiwan, Province of China +886
                      </option>
                      <option value="992">Tajikistan +992</option>
                      <option value="255">
                        Tanzania, United Republic of +255
                      </option>
                      <option value="66">Thailand +66</option>
                      <option value="670">Timor-Leste +670</option>
                      <option value="228">Togo +228</option>
                      <option value="690">Tokelau +690</option>
                      <option value="676">Tonga +676</option>
                      <option value="1868">Trinidad and Tobago +1868</option>
                      <option value="216">Tunisia +216</option>
                      <option value="90">Turkey +90</option>
                      <option value="7370">Turkmenistan +7370</option>
                      <option value="1649">
                        Turks and Caicos Islands +1649
                      </option>
                      <option value="688">Tuvalu +688</option>
                      <option value="256">Uganda +256</option>
                      <option value="380">Ukraine +380</option>
                      <option value="971">United Arab Emirates +971</option>
                      <option value="44">United Kingdom +44</option>
                      <option value="1">United States +1</option>
                      <option value="1">
                        United States Minor Outlying Islands +1
                      </option>
                      <option value="598">Uruguay +598</option>
                      <option value="998">Uzbekistan +998</option>
                      <option value="678">Vanuatu +678</option>
                      <option value="58">Venezuela +58</option>
                      <option value="84">Viet Nam +84</option>
                      <option value="1284">
                        Virgin Islands, British +1284
                      </option>
                      <option value="1340">Virgin Islands, U.s. +1340</option>
                      <option value="681">Wallis and Futuna +681</option>
                      <option value="212">Western Sahara +212</option>
                      <option value="967">Yemen +967</option>
                      <option value="260">Zambia +260</option>
                      <option value="263">Zimbabwe +263</option>
                    </select>
                  </div>
                  <div className="guestTitle">
                    <label htmlFor="phoneNumber">Local Number *</label>
                    <input
                      type="number"
                      name="phoneNumber"
                      value={user.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="guestTitle">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={user.email}
                  />
                </div>
                <div className="guestDiv">
                  <div className="guestTitle">
                    <label htmlFor="country">Country*</label>
                    <select
                      class="form-select"
                      id="country"
                      name="country"
                      value={user.country}
                      onChange={handleChange}
                    >
                      <option value="">country</option>
                      <option value="Afghanistan">Afghanistan</option>
                      <option value="Aland Islands">Aland Islands</option>
                      <option value="Albania">Albania</option>
                      <option value="Algeria">Algeria</option>
                      <option value="American Samoa">American Samoa</option>
                      <option value="Andorra">Andorra</option>
                      <option value="Angola">Angola</option>
                      <option value="Anguilla">Anguilla</option>
                      <option value="Antarctica">Antarctica</option>
                      <option value="Antigua and Barbuda">
                        Antigua and Barbuda
                      </option>
                      <option value="Argentina">Argentina</option>
                      <option value="Armenia">Armenia</option>
                      <option value="Aruba">Aruba</option>
                      <option value="Australia">Australia</option>
                      <option value="Austria">Austria</option>
                      <option value="Azerbaijan">Azerbaijan</option>
                      <option value="Bahamas">Bahamas</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="Barbados">Barbados</option>
                      <option value="Belarus">Belarus</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Belize">Belize</option>
                      <option value="Benin">Benin</option>
                      <option value="Bermuda">Bermuda</option>
                      <option value="Bhutan">Bhutan</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Bonaire, Sint Eustatius and Saba">
                        Bonaire, Sint Eustatius and Saba
                      </option>
                      <option value="Bosnia and Herzegovina">
                        Bosnia and Herzegovina
                      </option>
                      <option value="Botswana">Botswana</option>
                      <option value="Bouvet Island">Bouvet Island</option>
                      <option value="Brazil">Brazil</option>
                      <option value="British Indian Ocean Territory">
                        British Indian Ocean Territory
                      </option>
                      <option value="Brunei Darussalam">
                        Brunei Darussalam
                      </option>
                      <option value="Bulgaria">Bulgaria</option>
                      <option value="Burkina Faso">Burkina Faso</option>
                      <option value="Burundi">Burundi</option>
                      <option value="Cambodia">Cambodia</option>
                      <option value="Cameroon">Cameroon</option>
                      <option value="Canada">Canada</option>
                      <option value="Cape Verde">Cape Verde</option>
                      <option value="Cayman Islands">Cayman Islands</option>
                      <option value="Central African Republic">
                        Central African Republic
                      </option>
                      <option value="Chad">Chad</option>
                      <option value="Chile">Chile</option>
                      <option value="China">China</option>
                      <option value="Christmas Island">Christmas Island</option>
                      <option value="Cocos (Keeling) Islands">
                        Cocos (Keeling) Islands
                      </option>
                      <option value="Colombia">Colombia</option>
                      <option value="Comoros">Comoros</option>
                      <option value="Congo">Congo</option>
                      <option value="Congo, Democratic Republic of the Congo">
                        Congo, Democratic Republic of the Congo
                      </option>
                      <option value="Cook Islands">Cook Islands</option>
                      <option value="Costa Rica">Costa Rica</option>
                      <option value="Cote D'Ivoire">Cote D'Ivoire</option>
                      <option value="Croatia">Croatia</option>
                      <option value="Cuba">Cuba</option>
                      <option value="Curacao">Curacao</option>
                      <option value="Cyprus">Cyprus</option>
                      <option value="Czech Republic">Czech Republic</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Djibouti">Djibouti</option>
                      <option value="Dominica">Dominica</option>
                      <option value="Dominican Republic">
                        Dominican Republic
                      </option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="Egypt">Egypt</option>
                      <option value="El Salvador">El Salvador</option>
                      <option value="Equatorial Guinea">
                        Equatorial Guinea
                      </option>
                      <option value="Eritrea">Eritrea</option>
                      <option value="Estonia">Estonia</option>
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="Falkland Islands (Malvinas)">
                        Falkland Islands (Malvinas)
                      </option>
                      <option value="Faroe Islands">Faroe Islands</option>
                      <option value="Fiji">Fiji</option>
                      <option value="Finland">Finland</option>
                      <option value="France">France</option>
                      <option value="French Guiana">French Guiana</option>
                      <option value="French Polynesia">French Polynesia</option>
                      <option value="French Southern Territories">
                        French Southern Territories
                      </option>
                      <option value="Gabon">Gabon</option>
                      <option value="Gambia">Gambia</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Germany">Germany</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Gibraltar">Gibraltar</option>
                      <option value="Greece">Greece</option>
                      <option value="Greenland">Greenland</option>
                      <option value="Grenada">Grenada</option>
                      <option value="Guadeloupe">Guadeloupe</option>
                      <option value="Guam">Guam</option>
                      <option value="Guatemala">Guatemala</option>
                      <option value="Guernsey">Guernsey</option>
                      <option value="Guinea">Guinea</option>
                      <option value="Guinea-Bissau">Guinea-Bissau</option>
                      <option value="Guyana">Guyana</option>
                      <option value="Haiti">Haiti</option>
                      <option value="Heard Island and Mcdonald Islands">
                        Heard Island and Mcdonald Islands
                      </option>
                      <option value="Holy See (Vatican City State)">
                        Holy See (Vatican City State)
                      </option>
                      <option value="Honduras">Honduras</option>
                      <option value="Hong Kong">Hong Kong</option>
                      <option value="Hungary">Hungary</option>
                      <option value="Iceland">Iceland</option>
                      <option value="India">India</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Iran, Islamic Republic of">
                        Iran, Islamic Republic of
                      </option>
                      <option value="Iraq">Iraq</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Isle of Man">Isle of Man</option>
                      <option value="Israel">Israel</option>
                      <option value="Italy">Italy</option>
                      <option value="Jamaica">Jamaica</option>
                      <option value="Japan">Japan</option>
                      <option value="Jersey">Jersey</option>
                      <option value="Jordan">Jordan</option>
                      <option value="Kazakhstan">Kazakhstan</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Kiribati">Kiribati</option>
                      <option value="Korea, Democratic People's Republic of">
                        Korea, Democratic People's Republic of
                      </option>
                      <option value="Korea, Republic of">
                        Korea, Republic of
                      </option>
                      <option value="Kosovo">Kosovo</option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Kyrgyzstan">Kyrgyzstan</option>
                      <option value="Lao People's Democratic Republic">
                        Lao People's Democratic Republic
                      </option>
                      <option value="Latvia">Latvia</option>
                      <option value="Lebanon">Lebanon</option>
                      <option value="Lesotho">Lesotho</option>
                      <option value="Liberia">Liberia</option>
                      <option value="Libyan Arab Jamahiriya">
                        Libyan Arab Jamahiriya
                      </option>
                      <option value="Liechtenstein">Liechtenstein</option>
                      <option value="Lithuania">Lithuania</option>
                      <option value="Luxembourg">Luxembourg</option>
                      <option value="Macao">Macao</option>
                      <option value="Macedonia, the Former Yugoslav Republic of">
                        Macedonia, the Former Yugoslav Republic of
                      </option>
                      <option value="Madagascar">Madagascar</option>
                      <option value="Malawi">Malawi</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Maldives">Maldives</option>
                      <option value="Mali">Mali</option>
                      <option value="Malta">Malta</option>
                      <option value="Marshall Islands">Marshall Islands</option>
                      <option value="Martinique">Martinique</option>
                      <option value="Mauritania">Mauritania</option>
                      <option value="Mauritius">Mauritius</option>
                      <option value="Mayotte">Mayotte</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Micronesia, Federated States of">
                        Micronesia, Federated States of
                      </option>
                      <option value="Moldova, Republic of">
                        Moldova, Republic of
                      </option>
                      <option value="Monaco">Monaco</option>
                      <option value="Mongolia">Mongolia</option>
                      <option value="Montenegro">Montenegro</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Morocco">Morocco</option>
                      <option value="Mozambique">Mozambique</option>
                      <option value="Myanmar">Myanmar</option>
                      <option value="Namibia">Namibia</option>
                      <option value="Nauru">Nauru</option>
                      <option value="Nepal">Nepal</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Netherlands Antilles">
                        Netherlands Antilles
                      </option>
                      <option value="New Caledonia">New Caledonia</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Nicaragua">Nicaragua</option>
                      <option value="Niger">Niger</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Niue">Niue</option>
                      <option value="Norfolk Island">Norfolk Island</option>
                      <option value="Northern Mariana Islands">
                        Northern Mariana Islands
                      </option>
                      <option value="Norway">Norway</option>
                      <option value="Oman">Oman</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Palau">Palau</option>
                      <option value="Palestinian Territory, Occupied">
                        Palestinian Territory, Occupied
                      </option>
                      <option value="Panama">Panama</option>
                      <option value="Papua New Guinea">Papua New Guinea</option>
                      <option value="Paraguay">Paraguay</option>
                      <option value="Peru">Peru</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Pitcairn">Pitcairn</option>
                      <option value="Poland">Poland</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Puerto Rico">Puerto Rico</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Reunion">Reunion</option>
                      <option value="Romania">Romania</option>
                      <option value="Russian Federation">
                        Russian Federation
                      </option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="Saint Barthelemy">Saint Barthelemy</option>
                      <option value="Saint Helena">Saint Helena</option>
                      <option value="Saint Kitts and Nevis">
                        Saint Kitts and Nevis
                      </option>
                      <option value="Saint Lucia">Saint Lucia</option>
                      <option value="Saint Martin">Saint Martin</option>
                      <option value="Saint Pierre and Miquelon">
                        Saint Pierre and Miquelon
                      </option>
                      <option value="Saint Vincent and the Grenadines">
                        Saint Vincent and the Grenadines
                      </option>
                      <option value="Samoa">Samoa</option>
                      <option value="San Marino">San Marino</option>
                      <option value="Sao Tome and Principe">
                        Sao Tome and Principe
                      </option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Senegal">Senegal</option>
                      <option value="Serbia">Serbia</option>
                      <option value="Serbia and Montenegro">
                        Serbia and Montenegro
                      </option>
                      <option value="Seychelles">Seychelles</option>
                      <option value="Sierra Leone">Sierra Leone</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Sint Maarten">Sint Maarten</option>
                      <option value="Slovakia">Slovakia</option>
                      <option value="Slovenia">Slovenia</option>
                      <option value="Solomon Islands">Solomon Islands</option>
                      <option value="Somalia">Somalia</option>
                      <option value="South Africa">South Africa</option>
                      <option value="South Georgia and the South Sandwich Islands">
                        South Georgia and the South Sandwich Islands
                      </option>
                      <option value="South Sudan">South Sudan</option>
                      <option value="Spain">Spain</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="Sudan">Sudan</option>
                      <option value="Suriname">Suriname</option>
                      <option value="Svalbard and Jan Mayen">
                        Svalbard and Jan Mayen
                      </option>
                      <option value="Swaziland">Swaziland</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Syrian Arab Republic">
                        Syrian Arab Republic
                      </option>
                      <option value="Taiwan, Province of China">
                        Taiwan, Province of China
                      </option>
                      <option value="Tajikistan">Tajikistan</option>
                      <option value="Tanzania, United Republic of">
                        Tanzania, United Republic of
                      </option>
                      <option value="Thailand">Thailand</option>
                      <option value="Timor-Leste">Timor-Leste</option>
                      <option value="Togo">Togo</option>
                      <option value="Tokelau">Tokelau</option>
                      <option value="Tonga">Tonga</option>
                      <option value="Trinidad and Tobago">
                        Trinidad and Tobago
                      </option>
                      <option value="Tunisia">Tunisia</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Turkmenistan">Turkmenistan</option>
                      <option value="Turks and Caicos Islands">
                        Turks and Caicos Islands
                      </option>
                      <option value="Tuvalu">Tuvalu</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Ukraine">Ukraine</option>
                      <option value="United Arab Emirates">
                        United Arab Emirates
                      </option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="United States Minor Outlying Islands">
                        United States Minor Outlying Islands
                      </option>
                      <option value="Uruguay">Uruguay</option>
                      <option value="Uzbekistan">Uzbekistan</option>
                      <option value="Vanuatu">Vanuatu</option>
                      <option value="Venezuela">Venezuela</option>
                      <option value="Viet Nam">Viet Nam</option>
                      <option value="Virgin Islands, British">
                        Virgin Islands, British
                      </option>
                      <option value="Virgin Islands, U.s.">
                        Virgin Islands, U.s.
                      </option>
                      <option value="Wallis and Futuna">
                        Wallis and Futuna
                      </option>
                      <option value="Western Sahara">Western Sahara</option>
                      <option value="Yemen">Yemen</option>
                      <option value="Zambia">Zambia</option>
                      <option value="Zimbabwe">Zimbabwe</option>
                    </select>
                  </div>
                  <div className="guestTitle">
                    <label htmlFor="city">City </label>
                    <input
                      type="text"
                      name="city"
                      value={user.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="guestTitle">
                  <label htmlFor="nationality">Nationality*</label>
                  <select
                    name="nationality"
                    value={user.nationality}
                    onChange={handleChange}
                  >
                    <option value="">-- select one --</option>
                    <option value="afghan">Afghan</option>
                    <option value="albanian">Albanian</option>
                    <option value="algerian">Algerian</option>
                    <option value="american">American</option>
                    <option value="andorran">Andorran</option>
                    <option value="angolan">Angolan</option>
                    <option value="antiguans">Antiguans</option>
                    <option value="argentinean">Argentinean</option>
                    <option value="armenian">Armenian</option>
                    <option value="australian">Australian</option>
                    <option value="austrian">Austrian</option>
                    <option value="azerbaijani">Azerbaijani</option>
                    <option value="bahamian">Bahamian</option>
                    <option value="bahraini">Bahraini</option>
                    <option value="bangladeshi">Bangladeshi</option>
                    <option value="barbadian">Barbadian</option>
                    <option value="barbudans">Barbudans</option>
                    <option value="batswana">Batswana</option>
                    <option value="belarusian">Belarusian</option>
                    <option value="belgian">Belgian</option>
                    <option value="belizean">Belizean</option>
                    <option value="beninese">Beninese</option>
                    <option value="bhutanese">Bhutanese</option>
                    <option value="bolivian">Bolivian</option>
                    <option value="bosnian">Bosnian</option>
                    <option value="brazilian">Brazilian</option>
                    <option value="british">British</option>
                    <option value="bruneian">Bruneian</option>
                    <option value="bulgarian">Bulgarian</option>
                    <option value="burkinabe">Burkinabe</option>
                    <option value="burmese">Burmese</option>
                    <option value="burundian">Burundian</option>
                    <option value="cambodian">Cambodian</option>
                    <option value="cameroonian">Cameroonian</option>
                    <option value="canadian">Canadian</option>
                    <option value="cape verdean">Cape Verdean</option>
                    <option value="central african">Central African</option>
                    <option value="chadian">Chadian</option>
                    <option value="chilean">Chilean</option>
                    <option value="chinese">Chinese</option>
                    <option value="colombian">Colombian</option>
                    <option value="comoran">Comoran</option>
                    <option value="congolese">Congolese</option>
                    <option value="costa rican">Costa Rican</option>
                    <option value="croatian">Croatian</option>
                    <option value="cuban">Cuban</option>
                    <option value="cypriot">Cypriot</option>
                    <option value="czech">Czech</option>
                    <option value="danish">Danish</option>
                    <option value="djibouti">Djibouti</option>
                    <option value="dominican">Dominican</option>
                    <option value="dutch">Dutch</option>
                    <option value="east timorese">East Timorese</option>
                    <option value="ecuadorean">Ecuadorean</option>
                    <option value="egyptian">Egyptian</option>
                    <option value="emirian">Emirian</option>
                    <option value="equatorial guinean">
                      Equatorial Guinean
                    </option>
                    <option value="eritrean">Eritrean</option>
                    <option value="estonian">Estonian</option>
                    <option value="ethiopian">Ethiopian</option>
                    <option value="fijian">Fijian</option>
                    <option value="filipino">Filipino</option>
                    <option value="finnish">Finnish</option>
                    <option value="french">French</option>
                    <option value="gabonese">Gabonese</option>
                    <option value="gambian">Gambian</option>
                    <option value="georgian">Georgian</option>
                    <option value="german">German</option>
                    <option value="ghanaian">Ghanaian</option>
                    <option value="greek">Greek</option>
                    <option value="grenadian">Grenadian</option>
                    <option value="guatemalan">Guatemalan</option>
                    <option value="guinea-bissauan">Guinea-Bissauan</option>
                    <option value="guinean">Guinean</option>
                    <option value="guyanese">Guyanese</option>
                    <option value="haitian">Haitian</option>
                    <option value="herzegovinian">Herzegovinian</option>
                    <option value="honduran">Honduran</option>
                    <option value="hungarian">Hungarian</option>
                    <option value="icelander">Icelander</option>
                    <option value="indian">Indian</option>
                    <option value="indonesian">Indonesian</option>
                    <option value="iranian">Iranian</option>
                    <option value="iraqi">Iraqi</option>
                    <option value="irish">Irish</option>
                    <option value="israeli">Israeli</option>
                    <option value="italian">Italian</option>
                    <option value="ivorian">Ivorian</option>
                    <option value="jamaican">Jamaican</option>
                    <option value="japanese">Japanese</option>
                    <option value="jordanian">Jordanian</option>
                    <option value="kazakhstani">Kazakhstani</option>
                    <option value="kenyan">Kenyan</option>
                    <option value="kittian and nevisian">
                      Kittian and Nevisian
                    </option>
                    <option value="kuwaiti">Kuwaiti</option>
                    <option value="kyrgyz">Kyrgyz</option>
                    <option value="laotian">Laotian</option>
                    <option value="latvian">Latvian</option>
                    <option value="lebanese">Lebanese</option>
                    <option value="liberian">Liberian</option>
                    <option value="libyan">Libyan</option>
                    <option value="liechtensteiner">Liechtensteiner</option>
                    <option value="lithuanian">Lithuanian</option>
                    <option value="luxembourger">Luxembourger</option>
                    <option value="macedonian">Macedonian</option>
                    <option value="malagasy">Malagasy</option>
                    <option value="malawian">Malawian</option>
                    <option value="malaysian">Malaysian</option>
                    <option value="maldivan">Maldivan</option>
                    <option value="malian">Malian</option>
                    <option value="maltese">Maltese</option>
                    <option value="marshallese">Marshallese</option>
                    <option value="mauritanian">Mauritanian</option>
                    <option value="mauritian">Mauritian</option>
                    <option value="mexican">Mexican</option>
                    <option value="micronesian">Micronesian</option>
                    <option value="moldovan">Moldovan</option>
                    <option value="monacan">Monacan</option>
                    <option value="mongolian">Mongolian</option>
                    <option value="moroccan">Moroccan</option>
                    <option value="mosotho">Mosotho</option>
                    <option value="motswana">Motswana</option>
                    <option value="mozambican">Mozambican</option>
                    <option value="namibian">Namibian</option>
                    <option value="nauruan">Nauruan</option>
                    <option value="nepalese">Nepalese</option>
                    <option value="new zealander">New Zealander</option>
                    <option value="ni-vanuatu">Ni-Vanuatu</option>
                    <option value="nicaraguan">Nicaraguan</option>
                    <option value="nigerien">Nigerien</option>
                    <option value="north korean">North Korean</option>
                    <option value="northern irish">Northern Irish</option>
                    <option value="norwegian">Norwegian</option>
                    <option value="omani">Omani</option>
                    <option value="pakistani">Pakistani</option>
                    <option value="palauan">Palauan</option>
                    <option value="panamanian">Panamanian</option>
                    <option value="papua new guinean">Papua New Guinean</option>
                    <option value="paraguayan">Paraguayan</option>
                    <option value="peruvian">Peruvian</option>
                    <option value="polish">Polish</option>
                    <option value="portuguese">Portuguese</option>
                    <option value="qatari">Qatari</option>
                    <option value="romanian">Romanian</option>
                    <option value="russian">Russian</option>
                    <option value="rwandan">Rwandan</option>
                    <option value="saint lucian">Saint Lucian</option>
                    <option value="salvadoran">Salvadoran</option>
                    <option value="samoan">Samoan</option>
                    <option value="san marinese">San Marinese</option>
                    <option value="sao tomean">Sao Tomean</option>
                    <option value="saudi">Saudi</option>
                    <option value="scottish">Scottish</option>
                    <option value="senegalese">Senegalese</option>
                    <option value="serbian">Serbian</option>
                    <option value="seychellois">Seychellois</option>
                    <option value="sierra leonean">Sierra Leonean</option>
                    <option value="singaporean">Singaporean</option>
                    <option value="slovakian">Slovakian</option>
                    <option value="slovenian">Slovenian</option>
                    <option value="solomon islander">Solomon Islander</option>
                    <option value="somali">Somali</option>
                    <option value="south african">South African</option>
                    <option value="south korean">South Korean</option>
                    <option value="spanish">Spanish</option>
                    <option value="sri lankan">Sri Lankan</option>
                    <option value="sudanese">Sudanese</option>
                    <option value="surinamer">Surinamer</option>
                    <option value="swazi">Swazi</option>
                    <option value="swedish">Swedish</option>
                    <option value="swiss">Swiss</option>
                    <option value="syrian">Syrian</option>
                    <option value="taiwanese">Taiwanese</option>
                    <option value="tajik">Tajik</option>
                    <option value="tanzanian">Tanzanian</option>
                    <option value="thai">Thai</option>
                    <option value="togolese">Togolese</option>
                    <option value="tongan">Tongan</option>
                    <option value="trinidadian or tobagonian">
                      Trinidadian or Tobagonian
                    </option>
                    <option value="tunisian">Tunisian</option>
                    <option value="turkish">Turkish</option>
                    <option value="tuvaluan">Tuvaluan</option>
                    <option value="ugandan">Ugandan</option>
                    <option value="ukrainian">Ukrainian</option>
                    <option value="uruguayan">Uruguayan</option>
                    <option value="uzbekistani">Uzbekistani</option>
                    <option value="venezuelan">Venezuelan</option>
                    <option value="vietnamese">Vietnamese</option>
                    <option value="welsh">Welsh</option>
                    <option value="yemenite">Yemenite</option>
                    <option value="zambian">Zambian</option>
                    <option value="zimbabwean">Zimbabwean</option>
                  </select>
                </div>
              </div>
              <div className="creditInfo">
                <h2>CREDIT CARD INFORMATION</h2>
                <div className="guestTitle">
                  <label htmlFor="creditCardNumber">Credit Card Number *</label>
                  <input
                    type="number"
                    name="creditCardNumber"
                    value={user.creditCardNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="guestDiv">
                  <div className="guestTitle">
                    <label htmlFor="expirationMonth">Expiration date*</label>
                    <select
                      name="expirationMonth"
                      value={user.expirationMonth}
                      onChange={handleChange}
                    >
                      <option value="">months</option>

                      <option value="01">January</option>
                      <option value="02">February</option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>
                  <div className="guestTitle">
                    <label htmlFor="year">Year</label>
                    <select
                      name="year"
                      value={user.year}
                      onChange={handleChange}
                    >
                      <option value="">years</option>

                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                      <option value="2031">2031</option>
                      <option value="2032">2032</option>
                      <option value="2033">2033</option>
                      <option value="2034">2034</option>
                      <option value="2035">2035</option>
                      <option value="2036">2036</option>
                      <option value="2037">2037</option>
                      <option value="2038">2038</option>
                    </select>
                  </div>
                  <div className="guestTitle">
                    <label htmlFor="securityCode">
                      Security code(required)*
                    </label>
                    <input
                      type="number"
                      name="securityCode"
                      value={user.securityCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="guestTitle">
                  <label htmlFor="nameHolder">Name on credit card *</label>
                  <input
                    type="text"
                    name="nameHolder"
                    value={user.nameHolder}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="policy">
                <h2>{roomData && roomData.name} Policy</h2>
                <div className="roomPolicy">
                  <h3>Guarantee Policy:</h3>
                  <p>
                    All reservations must be guaranteed with a credit card valid
                    at the date of the start of your stay, unless otherwise
                    specified
                  </p>
                </div>
                <div className="roomPolicy">
                  <h3>Cancellation Policy:</h3>
                  <p>
                    No cancellation charge applies prior to 15:00 (local time),
                    up to 1 day prior to arrival. Beyond that time, the first
                    night will be charged.
                  </p>
                </div>
                <div className="roomPolicy">
                  <h3>Special information:</h3>
                  <p>
                    Pets up to 10 kg are welcome in our hotel. Fee of 150 PLN
                    per night per pet will be added to the bill upon check out.
                  </p>
                </div>
                <div className="roomPolicy">
                  <h3>Check in Policy:</h3>
                  <p>The room is available from 15:00.</p>
                </div>{" "}
                <div className="roomPolicy">
                  <h3>Check out Policy:</h3>
                  <p>The room must be vacated by 12:00 at the latest.</p>
                </div>
                <div className="roomPolicy">
                  <h3>Children Policy:</h3>
                  <p>
                    Depending on the hotel's policy regarding children,
                    supplements for children apply and are included in the total
                    amount of the reservation. See the tariff terms and
                    conditions when booking.
                  </p>
                </div>{" "}
                <div className="roomPolicy">
                  <h3>Members rate conditions:</h3>
                  <p>
                    Be or become a member of ALL - Accor Live Limitless. Members
                    must present their card upon check in at the hotel or their
                    member number if they have not yet received their card.
                    Maximum 2 rooms at the Members Rate can be booked per member
                    per stay.
                  </p>
                </div>{" "}
                <div className="roomPolicy">
                  <p>
                    * I have read and agree to the reservation terms and
                    conditions stated above.
                  </p>
                  <p>
                    * I understand that by selecting the Submit Details button,
                    I am authorizing a charge on the credit card number provided
                    to purchase the room and tax as specified in the reservation
                    details. I understand that the cancellation policy stated in
                    the Full Room Rate Summary is in effect.
                  </p>
                  <div className="policyCheck">
                    <input
                      type="checkbox"
                      name="termsCondition"
                      checked={user.termsCondition}
                      onChange={handleChange}
                    />
                    <label htmlFor="termsCondition">
                      I accept the Terms and Conditions*
                    </label>
                  </div>
                  <div className="policyCheck">
                    <input
                      type="checkbox"
                      name="emailMe"
                      onChange={handleChange}
                      checked={user.emailMe}
                    />
                    <label htmlFor="emailMe">
                      Please email me special offers and updates
                    </label>
                  </div>
                </div>
                <button className="nav-btn" type="submit">
                  confirm
                </button>
              </div>
            </motion.form>
          </div>
        </motion.div>
      )}

      {congra && (
        <div className="success">
          <button className="success-btn">
            <FcCheckmark />
          </button>
          <h1>congratulations your room has been booked successfully</h1>
          <div className="success-div">
            <Link to={`/rooms/${id}`} className="link-btn">
              {`back to your ${roomData.type}`}{" "}
            </Link>
            <Link to="/rooms" className="link-btn">
              back to your rooms
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
