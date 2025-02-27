
# Video Caption Editor

A simple web application that allows users to add captions to videos.

## Features

- Load videos from URLs
- Add captions with customizable start and end times
- Edit and delete captions
- Display captions over the video at the specified times
- Video player with play/pause and seeking functionality

## Technical Decisions

### Frontend Stack

- **React**: Chosen for its component-based architecture and efficient rendering
- **Vite**: Modern build tool that provides fast development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Shadcn/ui**: A set of beautifully-designed, accessible components and a code distribution platform.
- **react-player**: A React component for playing a variety of URLs, including file paths, YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia and DailyMotion

## Installation and Running

1. Clone the repository:
```
git clone git@github.com:akanandhu/video-captions-inserter.git
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (usually http://localhost:5173).

## Usage

1. Enter a video URL in the input field.
2. Use the video player to watch the video and find points for captions
3. Enter caption text and set start/end times (you can use the "Set Current" buttons)
4. Click "Add Caption" to create the caption
5. Captions will appear on the video at the specified times
6. Edit or delete captions using the buttons on each caption item

## Trade-offs and Limitations

- Using URLs instead of file uploads limits the types of videos that can be used (CORS issues)
- The native video player may be used instead of react-player to eliminate dependecy.
- Validating subtitles if the user adds two different captions to the same timeframe.
- Limited styling for UI.

## Future Enhancements

- Add ability to upload video files directly
- Add caption styling options (font, color, position)
- Implement caption export/import functionality (SRT, VTT formats)
- Add keyboard shortcuts for setting caption times
- Add Online subtitle search option for movies and documentaries
- Add caption templates or quick phrases for common use cases
- Implement undo/redo functionality

## Browser Support

This application works best in modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)