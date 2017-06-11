package com.test.student.core.service;

import com.test.student.model.Student;
import java.util.List;

/**
 *
 * @author Naveen
 */
public interface StudentService {

    /**
     *
     * @param student
     */
    public void addStudent(Student student);

    /**
     *
     * @return
     */
    public List<Student> listStudent();

    /**
     *
     * @param studentId
     * @return
     */
    public Student getStudent(String studentId);

    /**
     *
     * @param student
     */
    public void deleteStudent(Student student);

    /**
     *
     * @param student
     */
    public void updateStudent(Student student);
}
