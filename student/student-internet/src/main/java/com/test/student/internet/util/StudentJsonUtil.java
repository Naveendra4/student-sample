/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.test.student.internet.util;


import com.test.student.model.Student;
import com.test.student.model.json.StudnetJson;
import java.text.Format;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.stereotype.Component;

/**
 *
 * @author Naveen
 */
@Component
public class StudentJsonUtil {
   /**
    * convert student object to json model
    * @param student
    * @return 
    */
    public StudnetJson toJson(Student student) {

        StudnetJson studentJson = new StudnetJson();

        try {
            studentJson.setStudentId(student.getStudentId());
            studentJson.setAdmissionDate(convertDateToStrings(student.getAdmissionDate()));
            studentJson.setGender(student.getGender());
            studentJson.setEnrolledStatus(student.getEnrolledStatus());
            studentJson.setFirstName(student.getFirstName());
            studentJson.setMiddleName(student.getMiddleName());
            studentJson.setLastName(student.getLastName());
            studentJson.setDob(convertDateToStrings(student.getDob()));
            studentJson.setAddress(student.getAddress());
            studentJson.setContact(student.getContact());
            studentJson.setDescription(student.getDiscription());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return studentJson;
    }

    /**
     *covert date to string 
     * 
     * @param dateString
     * @return
     * @throws ParseException
     */
    private String convertDateToStrings(Date dateString) throws ParseException {
        Format formatter = new SimpleDateFormat("yyyy-MMM-dd");
        String dateStringObj = formatter.format(dateString);
        return dateStringObj;
    }

}
