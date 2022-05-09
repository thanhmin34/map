import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import "./index.css";
const getAddress = () => {
  return axios
    .get(`https://coinmap.org/api/v1/venues/?limit=28400`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

const num = 5000;
const Mapbox = () => {
  const [page, setPage] = useState({ start: 0, end: num });
  const [address, setAddress] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 50.12206394999416,
    longitude: -5.532898306846619,
    zoom: 4,
  });

  useEffect(() => {
    getAddress().then((data) => {
      return setAddress(data?.venues);
    });
    // console.log("address", address);
  }, []);
  const hanldePagination = (opt) => {
    if (opt === "-") {
      setPage({ start: page.start - num, end: page.end - num });
    } else {
      setPage({ start: page.end, end: page.end + num });
    }
    if (page.end <= 1000) setPage({ start: 0, end: 1000 });
    if (page.end >= address.length)
      setPage({ start: address.length - 3400, end: address.length });
    console.log(1);
  };

  const hanldeSetPage = (number) => {
    if (page.end > address.length) {
      setPage({
        start: address.length - 400,
        end: address.length,
      });
      // console.log(2);
    }
    setPage({
      start: num * number,
      end: (number + 1) * num,
    });
  };
  console.log(page);
  return (
    <div className="map">
      <Map
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{
          width: 800,
          height: 500,
        }}
        onViewportChange={(viewport) => setViewport(viewport)}
        mapboxAccessToken="pk.eyJ1IjoidGhhbmhtaW4zNCIsImEiOiJjbDJ1NHR2c3UwMHJuM21tajV1d2Y1cDg2In0.QXuY4i2_HWGOrn7_kMJWGw"
      >
        {address.length > 0 &&
          address.slice(page.start, page.end).map((item, index) => (
            <Marker latitude={item.lat} key={index} longitude={item.lon}>
              <img
                width={10}
                height={10}
                src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
                alt=""
              />
            </Marker>
          ))}
      </Map>
      <div className="pagination">
        <button onClick={() => hanldePagination("-")}>prev</button>
        <div className="pani">
          {new Array(6).fill(0).map((item, index) => (
            <span
              className="paniItem"
              key={index}
              onClick={() => hanldeSetPage(index)}
            >
              {index + 1}
            </span>
          ))}
        </div>
        <button onClick={() => hanldePagination("+")}>next</button>
      </div>
    </div>
  );
};

export default Mapbox;
