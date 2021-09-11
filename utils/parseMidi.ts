import { Midi } from "@tonejs/midi";
import { Track } from "@tonejs/midi";

export type TimeObj = {
  trackName: string;
  notes: {
    [noteName: string]: {
      start: number;
      end: number;
      // velocity: number;
    }[];
  };
};

export type OrderedTimeObj = {
  trackName: string;
  notes: { name: string; start: number; end: number; velocity: number }[];
};

export const sortNoteTimes = (track: Track, transposeOct = 0) => {
  const { name: trackName } = track;
  const timeObj: TimeObj = {
    trackName,
    notes: {},
  };
  timeObj;
  track.notes.forEach((note) => {
    const { duration, midi, name, time } = note;
    const transName = name
      .split("")
      .map((char) => (isNaN(Number(char)) ? char : Number(char) + transposeOct))
      .join("");
    timeObj.notes[transName] = timeObj.notes[transName] || [];
    const start = Number(time.toFixed(2));
    const end = time + duration;
    const roundEndTime = Number(end.toFixed(2));
    // const roundVelocity = Number(velocity.toFixed(2));

    timeObj.notes[transName].push({
      start,
      end: roundEndTime,
      // velocity: roundVelocity,
    });
  });
  Object.values(timeObj.notes).forEach((arr) =>
    arr.sort((a, b) => a.start - b.start)
  );
  return timeObj;
};

export const orderNotes = (track: Track) => {
  const { name: trackName } = track;
  const notes = track.notes.map(({ name, time, velocity, duration }) => {
    const timeRound = Number(time.toFixed(2));
    const end = Number((time + duration).toFixed(2));
    return { name, start: timeRound, end, velocity };
  });
  return { trackName, notes };
};
// a note can query the js obj and say
// I am "C2", and its 2.5 sec.  am i on or off
