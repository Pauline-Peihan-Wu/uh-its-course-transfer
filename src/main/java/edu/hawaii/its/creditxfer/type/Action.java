package edu.hawaii.its.creditxfer.type;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "ACTION", schema = "UHAPP_DB")
public class Action implements Serializable {

    public static final long serialVersionUID = 2L;
    private Long id;
    private String code;
    private String description;
    private String enabled;

    public Action() {
        // Empty.
    }

    @Id
    @Column(name = "ACTION_ID")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "ACTION_CODE")
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Column(name = "ACTION_DESCRIPTION")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(name = "ACTION_ENABLED", columnDefinition = "char")
    public String getEnabled() {
        return enabled;
    }

    public void setEnabled(String enabled) {
        this.enabled = enabled;
    }

    @Transient
    public boolean isActionEnabled() {
        return "Y".equals(enabled);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;

        Action action = (Action) o;

        if (id != null ? !id.equals(action.id) : action.id != null)
            return false;
        if (code != null ? !code.equals(action.code) : action.code != null)
            return false;
        if (description != null ? !description.equals(action.description) : action.description != null)
            return false;
        return enabled != null ? enabled.equals(action.enabled) : action.enabled == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (code != null ? code.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (enabled != null ? enabled.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Action [id=" + id + ", enabled=" + enabled
            + ", code=" + code + ", description=" + description + "]";
    }
}
