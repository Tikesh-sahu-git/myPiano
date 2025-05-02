document.addEventListener('DOMContentLoaded', function() {
  // Map piano keys to notes
  const keyToNote = {
    0: 'C', 1: 'C#', 2: 'D', 3: 'D#', 4: 'E',
    5: 'F', 6: 'F#', 7: 'G', 8: 'G#', 9: 'A',
    10: 'A#', 11: 'B', 12: 'C3', 13: 'C#3', 14: 'D3',
    15: 'D#3', 16: 'E3', 17: 'F3', 18: 'F#3', 19: 'G3',
    20: 'G#3'
  };

  const noteNames = {
    'C': 'C', 'C#': 'C♯', 'D': 'D', 'D#': 'D♯', 'E': 'E',
    'F': 'F', 'F#': 'F♯', 'G': 'G', 'G#': 'G♯', 'A': 'A',
    'A#': 'A♯', 'B': 'B', 'C3': 'C', 'C#3': 'C♯', 'D3': 'D',
    'D#3': 'D♯', 'E3': 'E', 'F3': 'F', 'F#3': 'F♯', 'G3': 'G',
    'G#3': 'G♯'
  };

  // UI Elements
  const keys = document.querySelectorAll('.key');
  const noteDisplay = document.querySelector('.note-display');
  const volumeControl = document.getElementById('volume');
  const keyboardToggle = document.getElementById('keyboard-toggle');
  const keyboardMap = document.getElementById('keyboard-map');
  
  // Initialize
  let activeKeys = new Set();
  
  // Volume control
  volumeControl.addEventListener('input', (e) => {
    setVolume(e.target.value);
  });
  
  function setVolume(volume) {
    document.querySelectorAll('audio').forEach(audio => {
      audio.volume = volume;
    });
  }
  
  // Keyboard map toggle
  keyboardToggle.addEventListener('click', () => {
    keyboardMap.style.display = keyboardMap.style.display === 'block' ? 'none' : 'block';
    keyboardToggle.textContent = keyboardMap.style.display === 'block' ? 
      'Hide Keyboard Map' : 'Show Keyboard Map';
  });
  
  // Mouse interaction
  keys.forEach((key, index) => {
    key.addEventListener('mousedown', () => {
      const note = keyToNote[index];
      playNote(note);
      highlightKey(key, true);
      showNoteName(noteNames[note]);
    });
    
    key.addEventListener('mouseup', () => {
      highlightKey(key, false);
    });
    
    key.addEventListener('mouseleave', () => {
      if (!activeKeys.has(key)) {
        highlightKey(key, false);
      }
    });
    
    // Touch support
    key.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const note = keyToNote[index];
      playNote(note);
      highlightKey(key, true);
      showNoteName(noteNames[note]);
      activeKeys.add(key);
    });
    
    key.addEventListener('touchend', () => {
      highlightKey(key, false);
      activeKeys.delete(key);
    });
  });
  
  // Function to play note
  function playNote(note) {
    const audio = document.getElementById(note);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.log("Audio play failed:", e));
    }
  }
  
  // Function to highlight key
  function highlightKey(key, isActive) {
    if (isActive) {
      key.classList.add('active');
      activeKeys.add(key);
    } else {
      key.classList.remove('active');
      activeKeys.delete(key);
    }
  }
  
  // Show note name display
  function showNoteName(note) {
    noteDisplay.textContent = note;
    noteDisplay.style.opacity = '1';
    
    clearTimeout(noteDisplay.timeout);
    noteDisplay.timeout = setTimeout(() => {
      noteDisplay.style.opacity = '0';
    }, 1000);
  }
  
  // Keyboard support
  const keyMap = {
    'a': 'C', 'w': 'C#', 's': 'D', 'e': 'D#', 'd': 'E',
    'f': 'F', 't': 'F#', 'g': 'G', 'y': 'G#', 'h': 'A',
    'u': 'A#', 'j': 'B', 'k': 'C3', 'o': 'C#3', 'l': 'D3',
    'p': 'D#3', ';': 'E3', "'": 'F3'
  };
  
  document.addEventListener('keydown', (e) => {
    if (keyMap[e.key.toLowerCase()]) {
      const note = keyMap[e.key.toLowerCase()];
      playNote(note);
      showNoteName(noteNames[note]);
      
      // Find and highlight the corresponding key
      const noteIndex = Object.values(keyToNote).indexOf(note);
      if (noteIndex !== -1) {
        highlightKey(keys[noteIndex], true);
      }
    }
  });
  
  document.addEventListener('keyup', (e) => {
    if (keyMap[e.key.toLowerCase()]) {
      const noteIndex = Object.values(keyToNote).indexOf(keyMap[e.key.toLowerCase()]);
      if (noteIndex !== -1) {
        highlightKey(keys[noteIndex], false);
      }
    }
  });
  
  // Initialize volume
  setVolume(volumeControl.value);
});