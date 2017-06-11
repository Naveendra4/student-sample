package com.test.student.core.service;

import com.test.student.core.dao.StudentDao;
import com.test.student.model.Student;
import java.util.List;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentDao studentDao;

    @Override
    @Transactional
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
    @Transactional
    public void deleteStudent(Student student) {

        studentDao.delete(student);

    }

    @Override
    @Transactional
    public void updateStudent(Student student) {
        studentDao.update(student);
    }

}
