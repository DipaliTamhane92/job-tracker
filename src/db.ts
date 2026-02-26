import { openDB } from "idb";
import type { DBSchema } from "idb"; //, IDBPDatabase
import type { Job } from "./types/job";

interface MyJobDb extends DBSchema {
    jobs: {
        key: number;
        value:Job;
        indexes: { "by-Date": string};
    };
}

const DB_NAME = "JobAppDB";
const DB_VERSION = 1;

export const initDB = async () => {
    return openDB<MyJobDb>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if(!db.objectStoreNames.contains("jobs")){
                const store = db.createObjectStore("jobs", {
                    keyPath: "id",
                    autoIncrement: true,
                });
                store.createIndex("by-Date", "date");
            }
        },
    });
};

export const addJob = async (job: Omit<Job, 'id'>) => {
    const db = await initDB();
    return db.add("jobs", job as Job);
}
export const updateJob = async (job: Job) => {
  const db = await initDB();
  return db.put('jobs', job);
};
export const getAllJobs = async () => {
  const db = await initDB();
  return db.getAll('jobs');
};
export const deleteJob = async (id: number) => {
  const db = await initDB();
  return db.delete('jobs', id);
};

// export const openDB = (): Promise<IDBDatabase> => {
//     return new Promise((resolve, reject)=> {
//         const request:IDBOpenDBRequest = indexedDB.open(DB_NAME, DB_VERSION);
//         request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
//             const db = (event.target as IDBOpenDBRequest).result;
//             if(!db.objectStoreNames.contains(STORE_NAME)){
//                 db.createObjectStore(STORE_NAME, {
//                     keyPath: "id",
//                     autoIncrement: true,
//                 });
//             }
//         };

//         request.onsuccess = () => resolve(request.result);
//         request.onerror = () => reject(request.error);
//     });
// };

// // export const addJobs = async (Jobs: Job): Promise<void> => {
// //   const db = await openDB();
// //   const transaction = db.transaction(STORE_NAME, "readwrite");
// //   const store = transaction.objectStore(STORE_NAME);
// //   store.add(Jobs);
// // };

// export const addJob = async (job: JobInput): Promise<void> => {
//   const db = await openDB();
//   const tx = db.transaction(STORE_NAME, "readwrite");
//   const store = tx.objectStore(STORE_NAME);
//   store.add(job);
// };

// export const getAllJobs = async (): Promise<Job[]> => {
//   const db = await openDB();
//   const transaction = db.transaction(STORE_NAME, "readonly");
//   const store = transaction.objectStore(STORE_NAME);

//   return new Promise((resolve, reject) => {
//     const request = store.getAll();

//     request.onsuccess = () => resolve(request.result as Job[]);
//     request.onerror = () => reject(request.error);
//   });
// };

// export const updateJob = async (Jobs: Job): Promise<void> => {
//   const db = await openDB();
//   const transaction = db.transaction(STORE_NAME, "readwrite");
//   const store = transaction.objectStore(STORE_NAME);
//   store.put(Jobs);
// };

// export const deleteJob = async (id: number): Promise<void> => {
//   const db = await openDB();
//   const transaction = db.transaction(STORE_NAME, "readwrite");
//   const store = transaction.objectStore(STORE_NAME);
//   store.delete(id);
// };