import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "../../store/store";
import { GenericActions } from "../../store/generticSlice";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";
import { CollectionOptions } from "./types";
import { getQuery } from "./getQuery";

type ListnerState = {
  name?: string;
  unsubscribe: () => void;
};

export function useFirestore<T extends DocumentData>(path: string) {
  const listenersRef = useRef<ListnerState[]>([]);
  const lastDocRef = useRef<QueryDocumentSnapshot | null>(null);
  const hasMore = useRef(true);

  useEffect(function () {
    let listenersRefValue: ListnerState[] | null = null;

    if (listenersRef.current) {
      listenersRefValue = listenersRef.current;
    }

    return () => {
      if (listenersRefValue) {
        listenersRefValue.forEach((listener) => {
          listener.unsubscribe();
        });
      }
    };
  }, []);

  const dispatch = useAppDispatch();

  //Create the read real time update for mutible document
  const loadCollection = useCallback(
    (actions: GenericActions<T>, options?: CollectionOptions) => {
      //pass the option as parameter in function arrow

      //set condition to pass the lastDocRef in getQuery
      if (options?.reset) {
        lastDocRef.current = null;
        hasMore.current = true;
        dispatch(actions.reset()) //add reset action to make options filter reset when redering.
      }

      dispatch(actions.loading());
      //const query = collection(db, path) replace
      const query = getQuery(path, options, lastDocRef); //update the useFireStore with query
      //the function pass the parameter as data which we use to paginate
      const processQuery = (
        querySnapshot: QuerySnapshot<DocumentData, DocumentData>
      ) => {
        const data: DocumentData[] = [];

        if (querySnapshot.empty) {
          hasMore.current = false;
          dispatch(actions.success([] as unknown as T));
          return;
        }
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        //Use condition to check number of value to make paginated before dispatching
        if (options?.pagination && options.limit) {
          lastDocRef.current =
            querySnapshot.docs[querySnapshot.docs.length - 1];
          hasMore.current = !(querySnapshot.docs.length < options.limit);
        }
        dispatch(actions.success(data as unknown as T));
      };
      //we can give the option to get the data or listen the data.
      if (options?.get) {
        //get the data
        getDocs(query).then((querySnapshot) => processQuery(querySnapshot));
      } else {
        const listener = onSnapshot(query, {
          next: (querySnapshot) => {
            processQuery(querySnapshot);
          },
          error: (error) => {
            dispatch(actions.error(error.message));
            console.log("Collection error:", error.message);
          },
        });
        listenersRef.current.push({ name: path, unsubscribe: listener });
      }
    },
    [dispatch, path]
  );
  //Create the read real time update for single document
  const loadDocument = useCallback(
    (id: string, actions: GenericActions<T>) => {
      dispatch(actions.loading());
      const docRef = doc(db, path, id);

      const listener = onSnapshot(docRef, {
        next: (doc) => {
          if (!doc.exists) {
            dispatch(actions.error("Document does not exist"));
            return;
          }
          dispatch(
            actions.success({ id: doc.id, ...doc.data() } as unknown as T)
          );
        },
      });
      listenersRef.current.push({
        name: path + "/" + id,
        unsubscribe: listener,
      });
    },
    [dispatch, path]
  );

  const create = async (data: T) => { //delete try and catch block
    const ref = doc(collection(db, path));
    await setDoc(ref, data);
    return ref;
  };
  const update = async (id: string, data: T) => {
    const docRef = doc(db, path, id);
    try {
      return await updateDoc(docRef, data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const remove = async (id: string) => {
    try {
      return await deleteDoc(doc(db, path, id));
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  //Adding new user in database
  const set = async (id: string, data: any) => {
    try {
      return await setDoc(doc(db, path, id), data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return { loadCollection, loadDocument, create, update, remove, set, hasMore };
}
