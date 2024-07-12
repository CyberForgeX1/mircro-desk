"use client";
import { Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';

const titleList = [
  { category: 'Select Category', name: 'Select Category' },
  { category: 'News', name: 'category' },
  { category: 'Web Development', name: 'category' },
  { category: 'Hardware', name: 'category' },
  { category: 'Science', name: 'category' },
  { category: 'Ai', name: 'category' },
  { category: 'Blockchain', name: 'category' },
];

export default function BlogModal({
  open,
  setOpen,
  createDocument,
  setBloFormgData,
  handleImageChange,
  thumbnailImageURL,
  loading,
}: any) {
  const handleFormData = (e: any) => {
    const { name, value } = e.target;
    setBloFormgData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form
                  className="bg-white m-2 px-4 pb-4 pt-5 sm:p-3 sm:pb-4 flex flex-col gap-y-2"
                  onSubmit={createDocument}
                >
                  <div>
                    <label
                      htmlFor=""
                      className="text-sm font-semibold tracking-widest"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="outline-none border placeholder:text-gray-500 w-full h-10 px-2 rounded mt-1 placeholder:text-sm"
                      placeholder="Enter blog title"
                      onChange={handleFormData}
                      required
                    />
                  </div>
                  <div>
                    <div className="pb-2">
                      <label
                        htmlFor=""
                        className="text-sm font-semibold tracking-widest"
                      >
                        Category
                      </label>
                    </div>
                    <div>
                      <select
                        id="categories"
                        name="category"
                        onChange={handleFormData}
                        className="bg-gray-50 border outline-none text-gray-500 text-sm rounded-lg block w-full p-2.5"
                        required
                      >
                        {titleList.map((section, index) => (
                          <option
                            value={section.category}
                            onChange={handleFormData}
                            key={index}
                          >
                            {section.category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* <div>
                    <div className="pb-2">
                      <label
                        htmlFor=""
                        className="text-sm font-semibold tracking-widest"
                      >
                        Published By:
                      </label>
                    </div>
                    <div>
                      <select
                        id="categories"
                        name="author"
                        onChange={handleFormData}
                        className="bg-gray-50 border outline-none text-gray-500 text-sm rounded-lg block w-full p-2.5"
                        required
                      >
                        {admin.map((author, index) => (
                          <option
                            value={author.name}
                            className="h-36 p-5"
                            key={index}
                          >
                            {author.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div> */}
                  <div>
                    <div className="pb-2">
                      <label
                        htmlFor=""
                        className="text-sm font-semibold tracking-widest"
                      >
                        Thumbnail
                      </label>
                    </div>
                    <div>
                      <input
                        type="file"
                        onChange={handleImageChange}
                        required
                      />
                    </div>
                    {thumbnailImageURL && (
                      <div className="w-[80%] h-[250px] mx-auto mt-3 rounded">
                        <img
                          src={thumbnailImageURL}
                          alt="Selected"
                          className="w-full h-full rounded"
                        />
                      </div>
                    )}
                  </div>
                  <div className="py-3 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      disabled={loading === true}
                      className={`inline-flex w-full justify-between rounded-md bg-[#2474A6] px-3 py-2 text-sm tracking-wider text-white shadow-sm sm:ml-3 sm:w-auto ${
                        loading && 'cursor-not-allowed opacity-50'
                      }`}
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
                          Adding...
                        </>
                      ) : (
                        'Add Blog'
                      )}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
