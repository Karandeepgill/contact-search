import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import contactsData from "./contacts.json";

const App = () => {
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [filteredContacts, setFilteredContacts] = useState(contactsData);
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const filtered = contactsData.filter((contact) =>
      Object.entries(filters).every(([key, value]) =>
        value ? contact[key]?.toLowerCase().includes(value.toLowerCase()) : true
      )
    );
    setFilteredContacts(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const selectContact = (contact) => {
    setSelectedContact(contact);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContacts = filteredContacts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  return (
    <div className="container mt-5">
      <h1>Choose a contact</h1>

      {/* Search Form */}
      <div className="search-form mb-4">
        <div className="row">
          <div className="col-md-6">
            <label>First name</label>
            <input
              type="text"
              name="firstName"
              value={filters.firstName}
              onChange={handleFilterChange}
              placeholder="First name"
            />
          </div>
          <div className="col-md-6">
            <label>Last name *</label>
            <input
              type="text"
              name="lastName"
              value={filters.lastName}
              onChange={handleFilterChange}
              placeholder="Last name"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>Date of birth</label>
            <input
              type="date"
              name="dob"
              value={filters.dob}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-6">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              value={filters.email}
              onChange={handleFilterChange}
              placeholder="Email address"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>Phone number</label>
            <input
              type="text"
              name="phone"
              value={filters.phone}
              onChange={handleFilterChange}
              placeholder="Phone number"
            />
          </div>
          <div className="col-md-6">
            <label>Street address</label>
            <input
              type="text"
              name="address"
              value={filters.address}
              onChange={handleFilterChange}
              placeholder="Street address"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              placeholder="City"
            />
          </div>
          <div className="col-md-4">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={filters.state}
              onChange={handleFilterChange}
              placeholder="State"
            />
          </div>
          <div className="col-md-4">
            <label>Zip code</label>
            <input
              type="text"
              name="zip"
              value={filters.zip}
              onChange={handleFilterChange}
              placeholder="Zip code"
            />
          </div>
        </div>

        <button className="btn btn-primary mt-3" onClick={applyFilters}>
          Search
        </button>
      </div>

      {/* Results Table */}
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>DOB</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {paginatedContacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <input
                  type="radio"
                  name="selectedContact"
                  onChange={() => selectContact(contact)}
                />
              </td>
              <td>{`${contact.firstName} ${contact.lastName}`}</td>
              <td>{contact.dob}</td>
              <td>{contact.address}</td>
              <td>{contact.city}</td>
              <td>{contact.state}</td>
              <td>{contact.zip}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Selected Contact */}
      {selectedContact && (
        <div className="selected-contact">
          <h2>Selected Contact</h2>
          <p>
            <strong>Name:</strong>{" "}
            {`${selectedContact.firstName} ${selectedContact.lastName}`}
          </p>
          <p>
            <strong>Email:</strong> {selectedContact.email}
          </p>
          <p>
            <strong>Phone:</strong> {selectedContact.phone}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {`${selectedContact.address}, ${selectedContact.city}, ${selectedContact.state} ${selectedContact.zip}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
