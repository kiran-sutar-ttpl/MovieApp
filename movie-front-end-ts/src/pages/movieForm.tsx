import React, { useState } from "react";
import Button from "../components/button/button";
import Input from "../components/input/input";
import "../styles/components/movieForm.scss";

interface MovieFormProps {
  formTitle: string;
  submitLabel: string;
  onSubmit: (movieData: {
    id?: string;
    title: string;
    year: string;
    poster: File | null;
  }) => void;
  selectedMovie: {
    id?: string;
    title: string;
    year: string;
    poster: File | null;
  };
  onCancel?: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({
  formTitle,
  submitLabel,
  onSubmit = () => {},
  onCancel = () => {},
  selectedMovie,
}) => {
  const [image, setImage] = useState<File | null>(
    selectedMovie?.poster || null
  );
  const [title, setTitle] = useState(selectedMovie?.title || "");
  const [year, setYear] = useState(selectedMovie?.year || "");

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setImage(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    const movieData = {
      id: selectedMovie?.id,
      title: title,
      year: year,
      poster: image,
    };
    onSubmit(movieData);
  };

  return (
    <div className="movie-details-container">
      <div className="movie-details-title">
        <h1>{formTitle}</h1>
      </div>
      <div className="movie-details-content">
        <div
          className="drag-area"
          onDrop={handleImageDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById("file-input")?.click()} // Trigger file input click
        >
          <input
            type="file"
            id="file-input"
            style={{ display: "none" }} // Hide the file input
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }}
          />
          {image ? (
            <img
              src={typeof(image) ==='string' ?  `data:image/jpeg;base64,${image}` :URL.createObjectURL(image)}
              alt="Movie Poster"
              className="preview-image"
            />
          ) : (
            <div className="drag-instructions">
              <p>Drag & Drop an image here or click to upload</p>
            </div>
          )}
        </div>
        <div className="movie-form">
          <Input
            type="text"
            id="title"
            className="input-title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="number"
            id="year"
            className="input-year"
            placeholder="Publishing Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <div className="button-group">
            <Button onClick={onCancel} label="Cancel" className="secondary" />
            <Button
              onClick={handleSubmit}
              label={submitLabel}
              className="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
