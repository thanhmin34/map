import React, { useEffect, useRef, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import ReactPaginate from "react-paginate";
import "./index.css";
import { useSelector } from "react-redux";

const num = 20;

const Mapbox = () => {
  const map = useSelector((state) => state.map);

  const [address, setAddress] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [page, setPage] = useState({ start: 0, end: num });
  const mapRef = useRef(null);

  const [viewport, setViewport] = useState({
    longitude: -65.3124115,
    latitude: 48.4377466,
    zoom: 2,
  });

  useEffect(() => {
    setAddress(map?.items?.venues);
  }, [map]);

  const handlePageClick = (event) => {
    setPage({
      start: num * (event.selected + 1) - 20,
      end: num * (event.selected + 1),
    });
  };

  const hanldeSetAddress = (item) => {
    console.log(item);
    setTimeout(() => {
      mapRef.current.setZoom(7);
      console.log(1);

      setTimeout(() => {
        mapRef.current.setZoom(16);
        console.log(2);
      }, 5000);
    }, 2000);
    mapRef.current.flyTo({ center: [item.lon, item.lat] });
  };
  // console.log("loading", loading);

  // console.log(map?.status);

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
        {address?.length > 0 &&
          address?.slice(page.start, page.end).map((item, index) => {
            return (
              <div key={index} className="relative">
                <Marker latitude={item.lat} longitude={item.lon}>
                  <img
                    onClick={() => setShowPopup(true)}
                    width={30}
                    height={30}
                    src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
                    alt=""
                  />
                </Marker>
                {showPopup && (
                  <Popup
                    latitude={item.lat}
                    longitude={item.lon}
                    closeButton={true}
                    closeOnClick={false}
                    anchor="bottom"
                    onClose={() => setShowPopup(!showPopup)}
                  >
                    <div className="popup">
                      <span>{item.id}</span>
                      <span>{item.category}</span>
                      <span>{item.name}</span>
                    </div>
                  </Popup>
                )}
              </div>
            );
          })}
      </Map>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        className="paginate"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={address?.length / num}
        previousLabel="prev"
        renderOnZeroPageCount={null}
      />
      {map?.status === "pending" ? (
        <span className="loading">loading...</span>
      ) : (
        <div className="address">
          {address?.length > 0 &&
            address?.slice(page.start, page.end).map((item, index) => (
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
      )}
    </div>
  );
};

export default Mapbox;
