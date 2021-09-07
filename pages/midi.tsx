import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Midi, MidiJSON } from "@tonejs/midi";
import JTREE from "react-json-tree";
import { sortNoteTimes, TimeObj } from "../utils/parseMidi";
import DownloadLink from "react-download-link";
import ChangeOctaves from "../components/ChangeOctaves";

const MidiPage: React.FC = ({}) => {
  const [midiData, setMidiData] = useState<Midi>();
  const [transposeOct, setTransposeOct] = useState(0);
  const [tracksJson, setTracksJson] = useState<any>();
  const [allTracks, setAllTracks] = useState<TimeObj[]>();
  const [jsxObj, setJsxObj] = useState<any>();

  const onDrop = useCallback(
    async (acceptedFiles) => {
      // Do something with the files
      acceptedFiles.forEach(async (file: any) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = async () => {
          const binaryStr = reader.result;
          const midi = binaryStr && new Midi(binaryStr as ArrayBuffer);
          if (midi) {
            setMidiData(midi as Midi);
            const track1 = sortNoteTimes(midi.tracks[0], transposeOct);
            const _allTracks = midi.tracks.map((track) =>
              sortNoteTimes(track, transposeOct)
            );
            setAllTracks(_allTracks);
            const _jsxObj = JSON.stringify(track1);
            setJsxObj(_jsxObj);

            setTracksJson(JSON.stringify(track1));
          }
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [transposeOct]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div className=" mx-4 border-2 border-purple-400 my-4 ">
        <div {...getRootProps()} className="text-center p-4 m-4">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag midi file here, or click to select files</p>
          )}
        </div>
      </div>
      <div>
        <ChangeOctaves
          setTransposeOct={setTransposeOct}
          transposeOct={transposeOct}
        />
      </div>
      <div>
        {allTracks?.map((track, i) => {
          const notes = Object.values(track.notes);
          const noteCount = notes.flatMap((n) => [...n]).length;
          return (
            <div
              key={i}
              className="border-2 border-blue-400 m-4 grid grid-cols-3"
            >
              <div>
                <div className=" text-xl ">{track.trackName}</div>
                <div className="text-gray-500">{noteCount} notes</div>
              </div>
              <div className="flex justify-center align-middle p-3">
                <DownloadLink
                  tagName="button"
                  label={
                    <div className="text-white">save {track.trackName}</div>
                  }
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  exportFile={() => JSON.stringify(track)}
                  filename={`${track.trackName}.json`}
                />
              </div>
              <div>
                <JTREE data={track} shouldExpandNode={() => false} />
              </div>
            </div>
          );
        })}
      </div>
      {/* <JTREE data={allTracks} /> */}
      {/* {tracksJson && (
        <DownloadLink
          label="save json"
          filename="tracksJ.json"
          exportFile={() => tracksJson}
        />
      )} */}
    </div>
  );
};

export default MidiPage;
