import React, { useEffect, useRef, useState } from "react";
import Map, { Marker, GeolocateControl, ScaleControl } from "react-map-gl";
import ReactPaginate from "react-paginate";
import "./index.css";

const num = 20;
const geolocateStyle = { float: "left", margin: "50px", padding: "10px" };

const Mapbox = () => {
  const [page, setPage] = useState({ start: 0, end: num });
  const [address, setAddress] = useState([]);
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState({
    longitude: -123.3124115,
    latitude: 48.4377466,
    zoom: 2,
  });

  useEffect(() => {
    fetch(`https://coinmap.org/api/v1/venues/?limit=28400`)
      .then((res) => res.json())
      .then((data) => setAddress(data?.venues))
      .catch((err) => console.log(err));
  }, []);

  const handlePageClick = (event) => {
    setPage({
      start: num * (event.selected + 1) - 20,
      end: num * (event.selected + 1),
    });
  };

  const hanldeSetAddress = (item) => {
    mapRef.current.flyTo({ center: [item.lon, item.lat] });
    // mapRef.current.zoom({ zoom: 20 });
    console.log(mapRef.current.zoomTo(18));
  };
  // console.log("viewport", viewport);

  return (
    <div className="map">
      <Map
        ref={mapRef}
        style={{
          width: 800,
          height: 500,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        initialViewState={viewport}
        mapboxAccessToken="pk.eyJ1IjoidGhhbmhtaW4zNCIsImEiOiJjbDJ1NHR2c3UwMHJuM21tajV1d2Y1cDg2In0.QXuY4i2_HWGOrn7_kMJWGw"
      >
        {address.length > 0 &&
          address.slice(page.start, page.end).map((item, index) => {
            return (
              <Marker latitude={item.lat} key={index} longitude={item.lon}>
                <img
                  width={20}
                  height={20}
                  src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
                  alt=""
                />
              </Marker>
            );
          })}
      </Map>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        className="paginate"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={address.length / num}
        previousLabel="prev"
        renderOnZeroPageCount={null}
      />

      <div className="address">
        {address.length > 0 &&
          address.slice(page.start, page.end).map((item, index) => (
            <div
              key={item.id}
              className="item"
              onClick={() => hanldeSetAddress(item)}
            >
              <span>{index}</span>
              <p>{item.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Mapbox;
