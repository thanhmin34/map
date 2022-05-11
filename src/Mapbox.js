import React, { useEffect, useRef, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import ReactPaginate from "react-paginate";
import "./index.css";

const num = 20;

const Mapbox = () => {
  const [page, setPage] = useState({ start: 0, end: num });
  const [address, setAddress] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState({
    longitude: -65.3124115,
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
    console.log(item);
    mapRef.current.flyTo({ center: [item.lon, item.lat] });

    mapRef.current.zoomTo(15);
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
                    anchor="top"
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
