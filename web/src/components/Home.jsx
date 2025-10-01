import React, { useState, useEffect } from 'react'
import { useNoteStore } from '../store/useNoteStore';

const Home = () => {

  const { notes, loading, error, fetchNotes, createNote, updateNote, deleteNote, clearError } = useNoteStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const created = await createNote(title, content);
    if (created) {
      setTitle('');
      setContent('');
    }
  };

  const startEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editTitle.trim() || !editContent.trim()) return;
    const updated = await updateNote(editingId, { title: editTitle, content: editContent });
    if (updated) {
      setEditingId(null);
      setEditTitle('');
      setEditContent('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(id);
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto p-4">
        <h2 className="text-2xl text-amber-50 font-bold mb-4">Add Notes</h2>
        <form onSubmit={handleCreate} className="mb-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border p-2 text-amber-50 rounded w-full mb-2"
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="border text-amber-50 p-2 rounded w-full mb-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Add Note'}
          </button>
        </form>

        <div>
          {notes.length === 0 && <p className="text-gray-600">You have no notes yet.</p>}
        <h2 className="text-2xl text-amber-50 font-bold mb-4">Notes</h2>
          {notes.map(note => (<>
            <div key={note._id} className="border rounded p-4 mb-4 bg-white shadow-sm">
              {editingId === note._id ? (
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                    required
                    />
                  <textarea
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                    required
                    />

                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                    disabled={loading}
                    >
                    {loading ? 'Updating...' : 'Update'}
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <h3 className="font-semibold text-lg mb-1">{note.title}</h3>
                  <p className="mb-2">{note.content}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    Created: {new Date(note.createdAt).toLocaleString()}
                    {note.updatedAt && note.updatedAt !== note.createdAt && (
                      <> | Updated: {new Date(note.updatedAt).toLocaleString()}</>
                    )}
                  </p>
                  <button
                    onClick={() => startEdit(note)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded mr-2"
                    >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    disabled={loading}
                    >
                    Delete
                  </button>
                </>
              )}
            </div>
              </>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home