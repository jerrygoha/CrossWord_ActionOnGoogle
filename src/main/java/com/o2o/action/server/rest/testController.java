package com.o2o.action.server.rest;

import com.o2o.action.server.app.test;
import com.o2o.action.server.util.CommonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.concurrent.ExecutionException;

@RestController
public class testController {
    private static final Logger LOGGER = LoggerFactory.getLogger(testController.class);
    private final test Test;

    //@Autowired
    //private CategoryRepository categoryRepository;

    public testController() {
        Test = new test();
    }

    @RequestMapping(value = "/test", method = RequestMethod.POST)
    public @ResponseBody
    String processActions(@RequestBody String body, HttpServletRequest request,
                          HttpServletResponse response) {
        String jsonResponse = null;
        try {

            LOGGER.info("\n###request : {}", body);
            jsonResponse = Test.handleRequest(body, CommonUtil.getHttpHeadersMap(request)).get();
            LOGGER.info("\n###response : {}", jsonResponse);
            System.out.println("------------------------end of conversation------------------------");

        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        return jsonResponse;
    }
}