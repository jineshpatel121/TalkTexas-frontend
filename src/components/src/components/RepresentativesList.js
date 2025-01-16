import React, { useEffect, useState } from "react";
import axios from "axios";

const RepresentativesList = () => {
    const [representatives, setRepresentatives] = useState([]);
    const [error, setError] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/representatives")
            .then(response => {
                setRepresentatives(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setError("Failed to load representatives data");
            });
    }, []);

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
    };

    // Filter representatives by the selected district
    const filteredRepresentatives = representatives.filter(rep =>
        selectedDistrict ? parseInt(rep.district, 10) === parseInt(selectedDistrict, 10) : true
    );

    // Get unique districts and sort them in ascending order
    const sortedDistricts = [...new Set(representatives.map(rep => rep.district))]
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Comic Sans", background: "linear-gradient(to bottom, #800020, #000080)", minHeight: "100vh" }}>
            {/* Company Name */}
            <header style={{ textAlign: "center", fontSize: "8rem", marginBottom: "20px", color: "white" }}>
                TalkTexas
            </header>

            {/* District Selection */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <label htmlFor="district-select" style={{ marginRight: "10px", fontSize: "1rem", color: "white" }}>
                    Select District:
                </label>
                <select
                    id="district-select"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    style={{ padding: "5px", fontSize: "1rem" }}
                >
                    <option value="">All Districts</option>
                    {sortedDistricts.map(district => (
                        <option key={district} value={district}>
                            District {district}
                        </option>
                    ))}
                </select>
            </div>

            {/* Representatives List */}
            <h2 style={{ textAlign: "center", marginBottom: "20px", color: "white" }}> Your Texas Representatives</h2>
            <ul style={{ listStyleType: "none", padding: 0, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                {filteredRepresentatives.map(rep => (
                    <li
                        key={rep.name}
                        style={{
                            width: "230px",
                            height: "280px",
                            border: "2px solid black",
                            padding: "10px",
                            borderRadius: "10px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "start",
                            textAlign: "center",
                            background: "floralwhite",
                        }}
                    >
                        {/* Representative Title */}
                        <strong style={{ marginBottom: "10px", fontSize: "1.1rem" }}>{rep.title}</strong>

                        {/* Representative Image */}
                        <img
                            src={rep.imageUrl}
                            alt={`${rep.name}`}
                            style={{ width: "80px", height: "80px", borderRadius: "50%", marginBottom: "10px" }}
                        />

                        {/* Representative Name */}
                        <div style={{ fontWeight: "bold", marginBottom: "10px" }}>{rep.name}</div>

                        {/* Representative Details */}
                        <div>
                            {rep.party}
                            <br />
                            District <strong>{rep.district}</strong>
                            <br />
                            {rep.email ? (
                                <span>
                                    <a href={`mailto:${rep.email}`} style={{ wordWrap: "break-word", 
                                                                            overflowWrap: "break-word", 
                                                                            textOverflow: "clipped", 
                                                                            overflow: "hidden", 
                                                                            display: "block", 
                                                                            maxWidth: "100%" }}>{rep.email}</a>
                                </span>
                            ) : (
                                <span>Email: N/A</span>
                            )}
                            <br />
                            {rep.number ? (
                                <span
                                style={{
                                    wordWrap: "break-word",
                                    overflowWrap: "break-wordc",
                                    textOverflow: "clipped",
                                    overflow: "hidden",
                                    display: "block",
                                    maxWidth: "100%"
                                }}
                            >
                                {rep.number}
                            </span>
                            ) : (
                                <span>Phone: N/A</span>
                            )}

                            <br />
                            {rep.moreUrl ? (
                                <a href={rep.moreUrl} style={{ color: "blue" }}>
                                    More Info
                                </a>
                            ) : (
                                <span>More Info: N/A</span>
                            )}

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RepresentativesList;
