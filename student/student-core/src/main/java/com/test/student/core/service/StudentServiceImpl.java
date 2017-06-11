package com.test.student.core.service;

import com.test.student.core.dao.StudentDao;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.test.student.modal.Student;
import org.springframework.beans.factory.annotation.Autowired;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentDao studentDao;

    @Override
    public void addStudent(Student student) {

        studentDao.create(student);
    }

    @Override
    public List<Student> listStudent() {

        // Execute the query and find all matching entries
        List<Student> students = studentDao.findAll();

        return students;
    }

    @Override
    public Student getStudent(String studentId) {

        Student student = studentDao.read(studentId);

        return student;
    }

    @Override
    public void deleteStudent(Student student) {
        
        studentDao.delete(student);

    }

}
