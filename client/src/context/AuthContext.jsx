import { createContext, useState, useMemo } from "react";
import { STUDENTS, PARENT_USER } from "../data/mocData";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("moonSchool_token");
  });

  const [parentUser, setParentUser] = useState(() => {
    const saved = localStorage.getItem("moonSchool_user");
    try {
      return saved ? JSON.parse(saved) : PARENT_USER;
    } catch {
      return PARENT_USER;
    }
  });

  const [studentsList, setStudentsList] = useState(STUDENTS);
  const [selectedStudentId, setSelectedStudentId] = useState("MS-001");

  // Currently selected student object
  const student = useMemo(() => {
    return (
      studentsList.find((s) => s.id === selectedStudentId) ||
      studentsList[0] ||
      STUDENTS[0]
    );
  }, [studentsList, selectedStudentId]);

  const login = (user, token, students) => {
    if (user) {
      setParentUser(user);
      localStorage.setItem("moonSchool_user", JSON.stringify(user));
    }
    if (token) {
      localStorage.setItem("moonSchool_token", token);
    }
    if (students && students.length > 0) {
      setStudentsList(students);
      setSelectedStudentId(students[0].id);
    }
    setIsAuthenticated(true);
  };

  const signup = (newUser, newStudents, token) => {
    if (newUser) {
      setParentUser(newUser);
      localStorage.setItem("moonSchool_user", JSON.stringify(newUser));
    }
    if (token) {
      localStorage.setItem("moonSchool_token", token);
    }
    if (newStudents && newStudents.length > 0) {
      setStudentsList((prev) => [...newStudents, ...prev]);
      setSelectedStudentId(newStudents[0].id);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("moonSchool_token");
    localStorage.removeItem("moonSchool_user");
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    parentUser,
    setParentUser,
    studentsList,
    setStudentsList,
    selectedStudentId,
    setSelectedStudentId,
    student,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
