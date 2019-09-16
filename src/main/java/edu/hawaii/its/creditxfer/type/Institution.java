package edu.hawaii.its.creditxfer.type;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "MST_TRANSFER_CATALOG_HEADER_UH")
public class Institution {

    public static final long serialVersionUID = 2L;

    private String code;
    private String description;
    private String city;
    private String stateProvince;

    @Id
    @Column(name = "SOURCE_INSTITUTION_CODE")
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Column(name = "SOURCE_INSTITUTION_DESC")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(name = "CITY")
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Column(name = "STATE_PROVINCE")
    public String getStateProvince() {
        return stateProvince;
    }

    public void setStateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
    }

    @Override
    public String toString() {
        return "Institution [code=" + code
            + ", description=" + description
            + ", city=" + city
            + ", stateProvince=" + stateProvince
            + "]";
    }
}
