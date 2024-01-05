import {
  useQuery,
  useQueryClient,
  keepPreviousData,
  QueryClient,
} from "@tanstack/react-query";
import Banner from "../pages/Banner";
import { useParams } from "react-router-dom";
import img from "../images/rooms/standard double room/img1.jpg";

const Details = () => {
  const { id } = useParams();
  // const queryClient = useQueryClient();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  const roomFn = async (id) => {
    const res = await fetch(`http://localhost:3000/rooms/${id}`);
    if (!res.ok) {
      throw Error("ther is no data");
    }
    return res.json();
  };
  const {
    data: roomData,
    isPending,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["room", id],
    queryFn: () => roomFn(id),
    initialData: () => queryClient.getQueryData("rooms"),
    placeholderData: keepPreviousData,
  });
  console.log(roomData && roomData.images[0]);

  if (isPending) {
    return <h2>...is loading</h2>;
  }
  return (
    <div>
      <div
        className="headerimages"
        style={{
          background: `<img src={${
            roomData && roomData.images[0]
          }/> center/cover`,
        }}
      >
        <Banner title={roomData.name} />
      </div>
      <h2>{roomData.id}</h2>
      <div className="roomSection">
        <div className="p">
          <h2>about the room </h2>
          <p>{roomData.intoduction}</p>
          <button className="nav-btn">book now </button>
        </div>
        <div className="roomIcon">
          <img src={img} alt="" className="img" />
        </div>
      </div>
    </div>
  );
};

export default Details;
