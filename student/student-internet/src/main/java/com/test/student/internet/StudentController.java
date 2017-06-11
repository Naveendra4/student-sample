/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.test.student.internet;


import com.test.student.core.service.StudentService;
import com.test.student.internet.navigation.NavigationPath;
import com.test.student.internet.util.StudentJsonUtil;
import com.test.student.model.json.JsonReturn;
import com.test.student.model.json.StudnetJson;
import com.test.student.model.Student;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author Naveen
 */
@Controller
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentJsonUtil studentJsonUtil;

    /**
     *
     * @return
     */
    @RequestMapping(value = NavigationPath.STUDENT, method = RequestMethod.GET)
    public String showStudent() {
        return "student-page";
    }

    /**
     *
     * @param admission
     * @param studentId
     * @param gender
     * @param isEndrolled
     * @param firstName
     * @param middleName
     * @param lastName
     * @param dateOfBirth
     * @param personalAddress
     * @param contact
     * @param description
     * @return
     * @throws Exception
     */
    @RequestMapping(value = NavigationPath.STUDENT_CREATE, method = RequestMethod.POST, headers = "Accept=application/json")
    @ResponseBody
    public JsonReturn saveStudentDetail(@RequestParam(value = "admission", required = false) String admission,
            @RequestParam(value = "stu-no", required = false) String studentId,
            @RequestParam(value = "gender", required = false) String gender,
            @RequestParam(value = "is-enrolled", required = false) String isEndrolled,
            @RequestParam(value = "first-name", required = false) String firstName,
            @RequestParam(value = "middle-name", required = false) String middleName,
            @RequestParam(value = "last-name", required = false) String lastName,
            @RequestParam(value = "dob", required = false) String dateOfBirth,
            @RequestParam(value = "personal-add", required = false) String personalAddress,
            @RequestParam(value = "contact", required = false) String contact,
            @RequestParam(value = "description", required = false) String description
    ) throws Exception {

        JsonReturn jsonReturn = new JsonReturn();
        try {

            Student student = new Student();

            student.setAdmissionDate(convertStringToDate(admission));
            student.setStudentId(studentId);
            student.setGender(gender);
            student.setEnrolledStatus(isEndrolled);
            student.setFirstName(firstName);
            student.setMiddleName(middleName);
            student.setLastName(lastName);
            student.setDob(convertStringToDate(dateOfBirth));
            student.setAddress(personalAddress);
            student.setContact(contact);
            student.setDiscription(description);

            studentService.addStudent(student);

            jsonReturn.setSuccess("true");
            jsonReturn.setResult(student.getStudentId());
        } catch (NullPointerException e) {
            jsonReturn.setSuccess("false");
            jsonReturn.setErrorMessage(e.getMessage());
            jsonReturn.setErrorCode("123");
        } catch (Exception e) {
            jsonReturn.setSuccess("false");
            jsonReturn.setErrorMessage(e.getMessage());
            jsonReturn.setErrorCode("123");
        }
        return jsonReturn;
    }

    /**
     *
     * @param studentId
     * @return
     */
    @RequestMapping(value = "/find/studentId", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public StudnetJson findByStudentId(@RequestParam(value = "studentId", required = true) String studentId) {

        Student student = studentService.getStudent(studentId);
        return studentJsonUtil.toJson(student);

    }

    /**
     *
     * @param studentId
     * @return
     */
    @RequestMapping(value = "/delete/studentId", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public JsonReturn deleteByStudentId(@RequestParam(value = "studentId", required = true) String studentId) {
        JsonReturn jsonReturn = new JsonReturn();
        try {

            Student student = studentService.getStudent(studentId);

            if (null != student) {
                studentService.deleteStudent(student);
                jsonReturn.setSuccess("true");
                jsonReturn.setResult(student.getStudentId());
            }
        } catch (Exception e) {
            jsonReturn.setSuccess("false");
            jsonReturn.setErrorMessage(e.getMessage());
            jsonReturn.setErrorCode("123");
        }
        return jsonReturn;
    }

    /**
     *
     * @param dateString
     * @return
     * @throws ParseException
     */
    private Date convertStringToDate(String dateString) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MMM-dd");
        Date date = formatter.parse(dateString);
        return date;
    }

}
