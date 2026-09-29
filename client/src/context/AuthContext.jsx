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

  const [studentsList, setStudentsList] = useState(() => {
    const saved = localStorage.getItem("moonSchool_students");
    try {
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return STUDENTS;
    } catch {
      return STUDENTS;
    }
  });

  const [selectedStudentId, setSelectedStudentId] = useState(() => {
    return (
      localStorage.getItem("moonSchool_selectedStudentId") || "MS-001"
    );
  });

  // Currently selected student object
  const student = useMemo(() => {
    return (
      studentsList.find((s) => (s.id || s._id) === selectedStudentId) ||
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
      const firstId = students[0].id || students[0]._id;
      setSelectedStudentId(firstId);
      localStorage.setItem("moonSchool_students", JSON.stringify(students));
      localStorage.setItem("moonSchool_selectedStudentId", firstId);
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
      const mergedStudents = [...newStudents, ...studentsList];
      setStudentsList(mergedStudents);
      const firstId = newStudents[0].id || newStudents[0]._id;
      setSelectedStudentId(firstId);
      localStorage.setItem("moonSchool_students", JSON.stringify(mergedStudents));
      localStorage.setItem("moonSchool_selectedStudentId", firstId);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("moonSchool_token");
    localStorage.removeItem("moonSchool_user");
    localStorage.removeItem("moonSchool_students");
    localStorage.removeItem("moonSchool_selectedStudentId");
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
