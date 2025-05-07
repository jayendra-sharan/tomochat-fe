import { Group, User, UserDataState } from "@/app/types";
import { fetchGraphQL } from "@/lib/fetchGraphQL";
import React, { createContext, useContext, useEffect, useReducer } from "react";


type UserDataAction =
  | { type: "SET_USER"; payload: User }
  | { type: "SET_GROUPS", payload: Group[] }
  | { type: "SET_CURRENT_GROUP", payload: string}

const UserDataContext = createContext<UserDataState | undefined>(undefined);
const UserDataDispatchContext = createContext<React.Dispatch<UserDataAction> | undefined>(undefined);

function userDataReducer(state: UserDataState, action: UserDataAction): UserDataState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_GROUPS": {
      return {
        ...state,
        groups: action.payload,
      }
    };
    case "SET_CURRENT_GROUP": {
      return {
        ...state,
        currentGroup: state?.groups?.find(group => group.id === action.payload),
      }
    }
    default:
      return state;
  }
}

export function UserDataProvider({ children }: { children: React.ReactNode}) {
  const [state, dispatch] = useReducer(userDataReducer, {});

  useEffect(() => {
    async function me() {
      const result = await fetchGraphQL(`
        query {
          me {
            id
            email
            displayName
            groups {
              id
              name
              groupType
              topic
              inviteLink
              createdAt
              updatedAt
              members {
                id
                joinedAt
                user {
                  id
                  displayName
                  userType
                }
              }
            }
          }
        }
      `);

      if (result.errors) {
        console.log("Errrrr");
      } else {
        dispatch({
          type: "SET_USER",
          payload: {
            id: result.me.id,
            email: result.me.email,
            displayName: result.me.displayName
          }
        });
        dispatch({
          type: "SET_GROUPS",
          payload: result.me.groups,
        });
      }
    }

    me();
  }, []);

  return (
    <UserDataContext.Provider value={state}>
      <UserDataDispatchContext.Provider value={dispatch}>
        {children}
      </UserDataDispatchContext.Provider>
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);

  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }

  return context;
}

export function useUserDataDispatch() {
  const context = useContext(UserDataDispatchContext);

  if (context === undefined) {
    throw new Error("useUserDispatchData must be used within a UserDataProvider");
  }

  return context;
}
