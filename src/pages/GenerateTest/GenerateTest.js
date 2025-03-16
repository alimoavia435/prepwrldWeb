import React, { useState, useEffect } from 'react';
import './GenerateTest.css';
import { getAllrooms } from '../../services/redux/middleware/getAllrooms';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Dropdown } from 'react-bootstrap';
import { getAlldata } from '../../services/redux/middleware/getAlldata';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Gene_rate_Test } from '../../services/redux/middleware/Gene_rate_Test';
const GenerateTest = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [systems, setSystems] = useState([]);
  const [selectedClassRooms, setselectedClassRooms] = useState([]);
  const [subject, setSubject] = useState("");
  const [rooms, setrooms] = useState();
  const location = useLocation();
  const { roomId } = location.state || {};
  const allData = useSelector(
    (state) => state?.getAlldata?.profile?.data?.stats
  )
  console.log(allData, "allData");
  useEffect(() => {
    if (allData) {
      setSubjects(allData?.Subject)
      setSystems(allData?.System)
    }
  }, [allData])

  const roomData = useSelector(
    (state) => state?.getAllrooms?.profile?.data?.rooms
  )
  useEffect(() => {
    if (roomData) {
      setrooms(roomData)
    }
  }, [roomData])
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectAllSubjects, setSelectAllSubjects] = useState(false);

  // Systems State

  const [selectedSystems, setSelectedSystems] = useState([]);
  const [selectAllSystems, setSelectAllSystems] = useState(false);
  const [totals, setTotals] = useState({ easy: 0, medium: 0, hard: 0 });
  const dispatch = useDispatch();

  const handleTypeChange = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSelectAllSubjects = () => {
    if (!selectAllSubjects) {
      setSelectedSubjects(subjects.map(s => s.subject));
    } else {
      setSelectedSubjects([]);
    }
    setSelectAllSubjects(!selectAllSubjects);
  };

  const handleSelectAllSystems = () => {
    if (!selectAllSystems) {
      console.log("inner");
      const allSystems = systems?.map(system => ({
        system: system.system,
        easy: '',
        medium: '',
        hard: '',
        error: '',
        isOpen: true
      }));
      console.log("inner");
      setSelectedSystems(allSystems);
      console.log("goda");
    } else {
      setSelectedSystems([]);
    }

    setSelectAllSystems(!selectAllSystems);
    console.log("god3");
  };


  const handleSystemChange = (system) => {
    setSelectedSystems(prev => {
      const existingIndex = prev.findIndex(s => s.system === system.system);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated.splice(existingIndex, 1);

        // Update selectAllSystems state
        const allSelected = updated?.length === systems?.length;
        setSelectAllSystems(allSelected);

        return updated;
      }

      const newSystem = {
        system: system.system,
        easy: '',
        medium: '',
        hard: '',
        error: '',
        isOpen: true
      };

      const updated = [...prev, newSystem];

      const allSelected = updated?.length === systems?.length;
      setSelectAllSystems(allSelected);

      return updated;
    });
  };

  const handleSystemInputChange = (systemName, difficulty, value) => {
    setSelectedSystems(prev => {
      return prev.map(system => {
        if (system.system === systemName) {
          const currentSystem = systems?.find(sys => sys.system === systemName);
          const updatedValues = {
            ...system,
            [difficulty]: value,
          };
          const easy = parseInt(updatedValues?.easy || 0);
          const medium = parseInt(updatedValues?.medium || 0);
          const hard = parseInt(updatedValues?.hard || 0);
          const total = easy + medium + hard;

          // Validate against system count
          return {
            ...updatedValues,
            error: total > currentSystem.count
              ? `This system only has ${currentSystem.count} questions!`
              : ''
          };
        }
        return system;
      });
    });
  };


  useEffect(() => {
    let newTotals = { easy: 0, medium: 0, hard: 0 };
    selectedSystems?.forEach(system => {
      newTotals.easy += Number(system.easy) || 0;
      newTotals.medium += Number(system.medium) || 0;
      newTotals.hard += Number(system.hard) || 0;
    });
    setTotals(newTotals);
  }, [selectedSystems]);


  const handleSubmit = () => {
    let errorMessages = [];

    if (selectedTypes.length < 1 || selectedSubjects.length < 1 || selectedSystems.length < 1 || selectedClassRooms.length < 1 || !totals || !roomId) {
      console.log('Error: Some required fields are missing.');
      return null;
    }

    console.log(selectedSystems, "selectedSystems");
    const systems = selectedSystems?.map(({ system, easy, medium, hard, error }) => {
      if (!system || (!easy && !medium && !hard)) {
        toast.error(' systems or difficulty levels are missing.');
        return null;

      }
      if (error && error !== ' ') {
        errorMessages.push(`Error: ${error}`);
        return null;
      }
      return {
        name: system,
        easy: easy || ' ',
        medium: medium || ' ',
        hard: hard || ' ',
      };
    });

    // Check if any value is null
    if (systems.includes(null)) {
      console.log('Error: System data is incomplete.');
      return null;
    }
    if (errorMessages.length > 0) {
      toast.error("You exceed the limit of any System Questions");
      return null;
    }
    // Check if roomIds are present
    const roomIds = selectedClassRooms?.map(room => room.roomId);
    if (!roomIds || roomIds.length === 0) {
      console.log('Error: Room IDs are missing.');
      return null;
    }

    // Proceed to prepare data if all checks pass
    const data = {
      type: selectedTypes,
      subject: selectedSubjects,
      systems,
      roomIds,
      totalQuestions: totals?.easy + totals?.medium + totals?.hard,
    };

    const datawithid = {
      data,
      roomId,
    };

    console.log('Form Data:', datawithid);
    dispatch(Gene_rate_Test(datawithid)).then((res) => {
      console.log(res,"Gene_rate_Test");
      if(res?.payload?.status===200){
        toast.success("Successfully Generated")
      }
    })
  };





  const handleSelect = (roomName, roomId) => {
    if (roomName === '') {
      return;
    }
    setSubject(roomName);
    const isRoomSelected = selectedClassRooms.some(room => room.roomId === roomId);

    if (!isRoomSelected) {
      setselectedClassRooms([...selectedClassRooms, { roomName, roomId }]);
      console.log("selectedClassRooms", [...selectedClassRooms, { roomName, roomId }]);
    }
  };


  useEffect(() => {
    dispatch(getAllrooms()).then((res) => {
    })
  }, [])
  const handleRemove = (room) => {
    setselectedClassRooms(selectedClassRooms.filter((s) => s.roomId !== room.roomId));
  };

  useEffect(() => {
    dispatch(getAlldata()).then((res) => {
    })
  }, [])
  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>Generate Test</h1>

      {/* Question Type Section */}
      <div className="section">
        <p>Question Type (Total Available {allData?.totalQuestions})</p>
        <label>
          <input
            type="checkbox"
            checked={selectedTypes.includes('traditional')}
            onChange={() => handleTypeChange('traditional')}
          />
          <span className="checkmark"></span>
          Traditional ({allData?.Type?.traditional})
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedTypes.includes('nextgen')}
            onChange={() => handleTypeChange('nextgen')}
          />
          <span className="checkmark"></span>
          Next-Gen ({allData?.Type?.nextgen})
        </label>
      </div>

      {/* Subjects Section */}
      <div className="section">
        <p>Subjects</p>
        <label>
          <input
            type="checkbox"
            checked={selectAllSubjects}
            onChange={handleSelectAllSubjects}
          />
          <span className="checkmark"></span>
          Select All
        </label>
        <div className='tefwqsvjhdsd'>
          {subjects?.map(subject => (
            <label key={subject?.subject}>
              <input
                type="checkbox"
                checked={selectedSubjects.includes(subject?.subject)}
                onChange={() => handleSubjectChange(subject?.subject)}
              />
              <span className="checkmark"></span>
              {subject?.subject} ({subject?.count})
            </label>
          ))}
        </div>
      </div>
      <div className="section">
        <p>Systems</p>
        <label>
          <input
            type="checkbox"
            checked={selectAllSystems}
            onChange={handleSelectAllSystems}
          />
          <span className="checkmark"></span>
          Select All
        </label>
        {/* {systems?.map(system => (
          <div key={system.system}>
            <label>
              <input
                type="checkbox"
                checked={!!selectedSystems[system.system]}
                onChange={() => handleSystemChange(system)}
              />
              <span className="checkmark"></span>
              {system.system} ({system.count})
            </label>
            {selectedSystems[system.system]?.isOpen && (
              <div className="popup">
                {['easy', 'medium', 'hard'].map(difficulty => (
                  <div key={difficulty}>
                    <label>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}:
                      <input
                        type="number"
                        min="0"
                        value={selectedSystems[system.system][difficulty]}
                        onChange={(e) =>
                          handleSystemInputChange(system.system, difficulty, e.target.value)
                        }
                      />
                    </label>
                  </div>
                ))}
                {selectedSystems[system.system]?.error && (
                  <div className="error-message">
                    {selectedSystems[system.system].error}
                  </div>
                )}
              </div>
            )}
          </div>
        ))} */}
        {systems?.map(system => {
          const selectedSystem = selectedSystems.find(s => s.system === system.system);
          return (
            <div key={system.system}>
              <label>
                <input
                  type="checkbox"
                  checked={!!selectedSystem}
                  onChange={() => handleSystemChange(system)}
                />
                <span className="checkmark"></span>
                {system.system} ({system.count})
              </label>
              {selectedSystem?.isOpen && (
                <div className="popup">
                  {['easy', 'medium', 'hard']?.map(difficulty => (
                    <div key={difficulty}>
                      <label>
                        {difficulty?.charAt(0)?.toUpperCase() + difficulty?.slice(1)}:
                        <input
                          type="number"
                          min="0"
                          value={selectedSystem[difficulty]}
                          onChange={(e) =>
                            handleSystemInputChange(system?.system, difficulty, e.target.value)
                          }
                        />
                      </label>
                    </div>
                  ))}
                  {selectedSystem?.error && (
                    <div className="error-message">
                      {selectedSystem?.error}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

      </div>
      <div className="section">
        <p>Class Rooms</p>
        <Dropdown >
          <Dropdown.Toggle
            variant="light"
            id="dropdown-basic"
            style={{
              backgroundColor: 'transparent',
              border: '1px solid rgba(0, 0, 0, 0.3)',
              color: 'black',
              height: "56px",
              width: '100%',
              textAlign: 'left',
            }}
          >
            Choose Subject
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ width: '100%' }}>
            {rooms?.map((subjectOption, index) => (
              <Dropdown.Item
                key={index}
                eventKey={subjectOption?.roomName}
                style={{ color: 'black' }}
                onClick={() => handleSelect(subjectOption?.roomName, subjectOption?._id)}
              >
                {subjectOption?.roomName}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div style={{ paddingTop: '10px' }}>
          {selectedClassRooms?.map((subject, index) => (
            <Badge
              key={index}
              pill
              className='ashdgfjh'
              style={{

                color: '#ffffff',
                padding: '8px 12px',
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => handleRemove(subject)}
            >
              {subject?.roomName} <span className="svxb" style={{ color: 'red', cursor: 'pointer', fontSize: "20px" }}>×</span>
            </Badge>
          ))}
        </div>
      </div>
      {/* Totals Display */}
      <div className="section">
        <p> Traditional ({totals?.easy + totals?.medium + totals?.hard})</p>
        <p>Easy: {totals?.easy}</p>
        <p>Medium: {totals?.medium}</p>
        <p>Hard: {totals?.hard}</p>
        <p>Totals:{totals?.easy + totals?.medium + totals?.hard}</p>
      </div>

      <button onClick={handleSubmit}>Generate Test</button>
    </div>
  );
};

export default GenerateTest;