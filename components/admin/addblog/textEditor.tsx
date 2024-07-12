"use client";
import { db } from '@/config/firebaseConfig';
import { Editor } from "@tinymce/tinymce-react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TextEditor = ({ id, data }: any) => {
  const [editorState, setEditorState] = useState(data.blogData);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSaveAsDraft = async () => {
    try {
      const newCollectionRef = collection(db, 'blogs');
      const newDocRef = doc(newCollectionRef, id);

      const dataToSave = {
        blogData: editorState,
      };

      const res = await setDoc(newDocRef, dataToSave, { merge: true });
      router.replace('/admin/draft');
      console.log('Data saved to Firestore:', res);
    } catch (error) {
      console.error('Error adding data to Firestore:', error);
    }
  };

  const saveAndPublish = async () => {
    setLoading(true);
    try {
      const newCollectionRef = collection(db, 'blogs');
      const newDocRef = doc(newCollectionRef, id);

      const dataToSave = {
        blogData: editorState,
        status: 'publish',
      };

      await setDoc(newDocRef, dataToSave, { merge: true });
    } catch (error) {
      console.error('Error adding data to Firestore:', error);
    } finally {
      setLoading(false);
      router.push('/admin/published-blog');
    }
  };

return (
  <div className="bg-[#f8f9fa] min-h-screen p-4">
    <Editor
      apiKey={process.env.NEXT_PUBLIC_EDITOR_API_KEY}
      init={{
        height: 600,
        menubar: false,
        content_style: 'body {font-family:Georgia}',
        plugins:
          'anchor autolink charmap codesample emoticons image link lists media searchreplace visualblocks',
        toolbar:
          'undo redo | blocks | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
      }}
      value={editorState}
      onEditorChange={(newText) => {
        setEditorState(newText);
      }}
    />
    <div className="absolute top-0 right-[2%] flex justify-end">
      <button
        type="submit"
        className="border border-black text-black text-sm px-4 py-2 rounded mt-2 inline-flex"
        onClick={handleSaveAsDraft}
      >
        Save to draft
      </button>
      <button
        type="submit"
        className="bg-[#2474A6] text-white text-sm px-4 py-2 rounded mt-2 ml-3 inline-flex"
        onClick={saveAndPublish}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Publishing...
          </>
        ) : (
          <>Publish</>
        )}
      </button>
    </div>
  </div>
);
};

export default TextEditor;
