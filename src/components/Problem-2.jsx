import React, { useState } from "react";

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [modalDataA, setModalDataA] = useState([]);
  const [modalDataB, setModalDataB] = useState([]);
  const [onlyEvenA, setOnlyEvenA] = useState(false);
  const [onlyEvenB, setOnlyEvenB] = useState(false);
  const [searchInputA, setSearchInputA] = useState("");
  const [searchInputB, setSearchInputB] = useState("");
  const [selectedContact, setSelectedContact] = useState({});

  const fetchContacts = async (isUS = false) => {
    try {
      const apiUrl = isUS
        ? "https://contact.mediusware.com/api/country-contacts/us-contacts"
        : "https://contact.mediusware.com/api/contacts";

      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching contacts: ", error);
      return [];
    }
  };

  const handleOpenModalA = async () => {
    setShowModalA(true);
    const data = await fetchContacts(false);
    setModalDataA(data);
  };

  const handleOpenModalB = async () => {
    setShowModalB(true);
    const data = await fetchContacts(true);
    setModalDataB(data);
  };

  const handleCloseModalA = () => {
    setShowModalA(false);
  };

  const handleCloseModalB = () => {
    setShowModalB(false);
  };

  const handleCheckboxChangeA = () => {
    setOnlyEvenA(!onlyEvenA);
  };

  const handleCheckboxChangeB = () => {
    setOnlyEvenB(!onlyEvenB);
  };

  const handleSearchInputChangeA = (e) => {
    setSearchInputA(e.target.value);
  };

  const handleSearchInputChangeB = (e) => {
    setSearchInputB(e.target.value);
  };

  const handleModalCClose = () => {
    setShowModalC(false);
  };

  const handleModalCOpen = (contact) => {
    setSelectedContact(contact);
    setShowModalC(true);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={handleOpenModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={handleOpenModalB}
          >
            US Contacts
          </button>
        </div>
      </div>
      {showModalA && (
        <div className="modal">
          <button className="modal-btn-a">Modal Button A</button>
          <button className="modal-btn-b" onClick={handleOpenModalB}>
            US Contacts
          </button>
          <button className="modal-btn-c" onClick={handleCloseModalA}>
            Close
          </button>
          <input
            type="checkbox"
            onChange={handleCheckboxChangeA}
            checked={onlyEvenA}
          />
          <input
            type="text"
            placeholder="Search"
            value={searchInputA}
            onChange={handleSearchInputChangeA}
          />
          <div className="modal-content">
            {modalDataA.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleModalCOpen(contact)}
                className="contact-item"
              >
                {contact.name}
              </div>
            ))}
          </div>
        </div>
      )}
      {showModalB && (
        <div className="modal">
          <button className="modal-btn-b">Modal Button B</button>
          <button className="modal-btn-a" onClick={handleOpenModalA}>
            All Contacts
          </button>
          <button className="modal-btn-c" onClick={handleCloseModalB}>
            Close
          </button>
          <input
            type="checkbox"
            onChange={handleCheckboxChangeB}
            checked={onlyEvenB}
          />
          <input
            type="text"
            placeholder="Search"
            value={searchInputB}
            onChange={handleSearchInputChangeB}
          />
          <div className="modal-content">
            {modalDataB.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleModalCOpen(contact)}
                className="contact-item"
              >
                {contact.name}
              </div>
            ))}
          </div>
        </div>
      )}
      {showModalC && (
        <div className="modal">
          <button className="modal-btn-c" onClick={handleModalCClose}>
            Close
          </button>
          <div className="modal-content">
            <div>Name: {selectedContact.name}</div>
            <div>Email: {selectedContact.email}</div>
            {/* Add more contact details here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Problem2;
