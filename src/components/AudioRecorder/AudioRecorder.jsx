import React, { Component } from "react";
import axios from "axios";
import AudioAnalyser from "react-audio-analyser";
import Loading from "../Loading/Loading";
import waveIcon from "../../assets/wave.png"
import ReactPlayer from 'react-player/youtube'
import "./AudioRecorder.css"

export default class AudioRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      recordedData: null,
      recordedDataURL: null,
      isRecording: false,
      isPause: false,
      isStop:false,
      dataSend:false,
      sending:false,
      error:false,
      responseData:null
    };
  }

  controlAudio = (status, isRecording, isPause,isStop) => {
    this.setState(
      {
        status,
        isRecording,
        isPause,
        isStop
      },
      () => {
        console.log(this.state.status);
      }
    );
  };

  stopCallback = (recordedData) => {
    const recordedDataURL = URL.createObjectURL(recordedData);
    this.setState({
      recordedData,
      recordedDataURL,
    });
    console.log("Recorded Data:", recordedData);
  };

  sendRecordedData = () => {
    const { recordedData } = this.state;
    
    this.setState({
      sending:true,
      dataSend:true
    })

    // Create a FormData object and append the recorded data to it
    const formData = new FormData();
    formData.append("audio", recordedData);

    // Make a POST request to the server endpoint using Axios
    const response =axios
      .post(`${process.env.REACT_APP_Curhat_URL}/model/detect/`, formData)
      .then((response) => {
        // Handle the response from the server
        console.log("Data sent successfully:", response);
        this.setState({
          responseData: response.data,
          sending:false
      })
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error sending data:", error);
        this.setState({
          error:true,
          sending:false
      })
      });
      console.log(response)
  };


  render() {
    const { status, isStop ,recordedDataURL, dataSend, sending, error, responseData, isRecording, isPause } = this.state;
    const audioProps = {
      audioType: "audio/wav",
      status,
      timeslice: 1000,
      backgroundColor: "rgba(55,65,81,0.001)",
      strokeColor: "#000",
      startCallback: (e) => {
        console.log("succ start", e);
      },
      pauseCallback: (e) => {
        console.log("succ pause", e);
      },
      stopCallback: this.stopCallback,
      onRecordCallback: (e) => {
        console.log("recording", e);
      },
      errorCallback: (err) => {
        console.log("error", err);
      },
    };

    const hideModal = () => {
      this.setState({
        dataSend:false,
        responseData:null
      });
    };

    return (
      <div className="flex flex-col items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800 overflow-hidden">
        
          <div className={` ${
            isStop ? "" : "hidden"
          } `}>
          <audio src={recordedDataURL} controls />
          
          <div
            id="popup-modal"
            tabIndex="-1"
            className={`fixed inset-0 flex items-center justify-center z-50 ${
              dataSend ? "" : "hidden"
            } p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
          >
            <div
              onClick={() => {
                if (!sending) {hideModal()}
              }}
              className="fixed inset-0 bg-black opacity-50"
            ></div>
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {!sending && (
                  <button
                    onClick={hideModal}
                    type="button"
                    className="absolute top-0.5 right-0.5 text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white focus:outline-none focus:ring-transparent"
                    data-modal-hide="popup-modal"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                )}
                <div className="p-6 text-center">
                  {!sending && error && (
                    <svg
                      aria-hidden="true"
                      className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  )}
                  {sending && <Loading />}
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    {(function () {
                      if (sending) {
                        return "Please wait, while we analyze your voice";
                      }
                      if (error) {
                        return "Some error was occured, please try again";
                      }
                      if (responseData && responseData.type === 'video') {
                        return `I understand that you're feeling ${responseData.emotion} right now. I came across a video that might help you find some perspective. Would you like to watch it together?`
                        
                      }else if(responseData && responseData.type ==='text'){
                        return responseData.data
                      }
                    })()}
                  </h3>
                  {responseData && responseData.type ==='video' &&(

                    <div className='player-wrapper'>
                      
                    <ReactPlayer
                      className='react-player'
                      url={responseData.data}
                      width='100%'
                      height='100%'
                    />
                  </div>
                  
                  ) }
                  {!sending && (
                    <>
                      {(function () {
                        if (error) {
                          return (
                            <>
                            <button
                              data-modal-target="popup-modal"
                              data-modal-toggle="popup-modal"
                              className="text-white border bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                              type="button"
                              onClick={this.sendRecordedData}
                            >
                              Resend Data
                            </button>
                            <button
                            onClick={hideModal}
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-gray-500 border bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                          >
                            No, cancel
                          </button>
                          </>
                          );
                        }
                      })()}
                      
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        
        <AudioAnalyser {...audioProps} className={` ${
            isStop ? "hidden" : ""
          } `}/>
          <div className="flex justify-center">
            {!isRecording ? (
              <>
              <button
                style={{ margin: "10px" }}
                className={
                  " border rounded-full w-16 h-16 outline-black bg-white shadow flex items-center justify-center"
                }
                onClick={() => {
                  this.controlAudio("recording", true, false,false);
                }}
              >
                <svg
                  class="h-8 w-8 text-black"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <rect x="9" y="2" width="6" height="11" rx="3" />
                  <path d="M5 10a7 7 0 0 0 14 0" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </button>
              {recordedDataURL && <button
                style={{ margin: "10px" }}
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                // className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                className="rounded-full border w-16 h-16 outline-black bg-white shadow flex items-center justify-center  "
                type="button"
                onClick={this.sendRecordedData}
              >
                <img src={waveIcon} alt="wave-icon" style={{ width: "65%", height: "65%" }}/>
                <span className="sr-only">Send Data</span>
              </button>}
              </>
              
            ) : (
              <>
                {!isPause ? (
                  <button
                    style={{ margin: "10px" }}
                    className="rounded-full border w-16 h-16 outline-black bg-white shadow flex items-center justify-center  "
                    onClick={() => {
                      this.controlAudio("paused", true, true,false);
                    }}
                  >
                    <svg
                      class="h-8 w-8 text-black"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <rect x="6" y="4" width="4" height="16" />{" "}
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  </button>
                ) : (
                  
                  <button
                    style={{ margin: "10px" }}
                    className="rounded-full border w-16 h-16 outline-black bg-white shadow flex items-center justify-center  "
                    onClick={() => {
                      this.controlAudio("recording", true, false,false);
                    }}
                  >
                    <svg
                      class="h-8 w-8 text-green-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </button>
                  
                
                )}

                <button
                  style={{ margin: "10px" }}
                  className="rounded-full border w-16 h-16 bg-white shadow flex items-center justify-center"
                  onClick={() => {
                    this.controlAudio("inactive", false, false,true);
                  }}
                >
                  <svg
                    class="h-8 w-8 text-red-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                  </svg>
                </button>
              </>
            )}
          </div>
        
        
      </div>
    );
  }
}