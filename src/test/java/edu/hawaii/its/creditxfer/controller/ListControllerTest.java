package edu.hawaii.its.creditxfer.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import edu.hawaii.its.creditxfer.configuration.AppConfig;
import edu.hawaii.its.creditxfer.configuration.AppConfigRun;
import edu.hawaii.its.creditxfer.configuration.SpringBootWebApplication;

import static org.junit.Assert.assertNotNull;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = { SpringBootWebApplication.class })
@ContextConfiguration(classes = {AppConfig.class, AppConfigRun.class})
public class ListControllerTest {

    @Autowired
    ListController listController;

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        mockMvc = webAppContextSetup(context)
            .apply(springSecurity())
            .build();
    }

    @Test
    public void testConstruction() {
        assertNotNull(listController);
    }

    @Test
    public void requestUrlList() throws Exception {
        mockMvc.perform(get("/li"))
            .andExpect(status().isOk())
            .andExpect(view().name("list"));
    }
}
